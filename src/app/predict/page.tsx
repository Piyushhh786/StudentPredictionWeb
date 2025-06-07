'use client';

import { useState,useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FormFeatures, formSchema} from '@/lib/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';

export default function PredictPage() {
  const [result, setResult] = useState<string | null>(null);

  const fetchInitial = ()=>{
    const startMLServer = async ()=>{
        await fetch("https://studentprediction-ml.onrender.com");
    }
    startMLServer();
  };
  useEffect(fetchInitial,[]);// only one run at the time of visiting the home page
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFeatures>({
    resolver: zodResolver(formSchema),
  });
 

  const onSubmit: SubmitHandler<FormFeatures> = async (data: FormFeatures) => {
   
    try {
      
        const res = await fetch('https://studentprediction-ml.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResult(`Predicted Score: ${json.prediction}`);
      await fetch('https://student-prediction-web.vercel.app/predict/api',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({features: data.features,result:json.prediction}),
      });

    } catch (err) {
        console.log(err);
      setResult('Error during prediction.');
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-black text-center mb-6">
        Student Performance Predictor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md bg-gradient-to-tr from-neutral-300 to-neutral-700 p-6 rounded-lg shadow-lg">
        {/* Hours Studied */}
        <section>
          <Label className='mb-3' >Hours Studied</Label>
          <Input type="number" {...register('features.Hours Studied', { required: true })} />
          {errors.features?.["Hours Studied"]?.message && (
            <p className="text-red-500 text-sm">{errors.features["Hours Studied"].message}</p>
          )}
          {/* {errors.features?.['Hours Studied'] && <p className="text-red-500 text-sm">Required</p>} */}
        </section>

        {/* Previous Score */}
        <section>
          <Label className='mb-3'>Previous Score</Label>
          <Input type="number" {...register('features.Previous Scores', { required: true })} />
          {errors.features?.['Previous Scores']?.message && <p className="text-red-500 text-sm">{errors.features["Previous Scores"].message}</p>}
        </section>

        {/* Extracurricular Activities */}
        <section>
          <Label className='mb-3'>Extracurricular Activities</Label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            {...register('features.Extracurricular Activities', { required: true })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.features?.['Extracurricular Activities']?.message && <p className="text-red-500 text-sm">{errors.features['Extracurricular Activities'].message}</p>}
        </section>
        {/* Sleep Hours */}
        <section>
          <Label className='mb-3'>Sleep Hours</Label>
          <Input type="number" {...register('features.Sleep Hours', { required: true })} />
          {errors.features?.['Sleep Hours']?.message && <p className="text-red-500 text-sm">{errors.features['Sleep Hours'].message}</p>}
        </section>

        {/* Question Papers Practiced */}
        <section>
          <Label className='mb-3'>Sample Question Papers Practiced</Label>
          <Input type="number" {...register('features.Sample Question Papers Practiced', { required: true })} />
          {errors.features?.['Sample Question Papers Practiced']?.message && <p className="text-red-500 text-sm">{errors.features['Sample Question Papers Practiced'].message}</p>}
        </section>


        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Predicting...' : 'Predict'}
        </Button>
      </form>

      {result && (
        <div className="mt-6 text-center text-lg font-semibold text-blue-800">
          {result}
        </div>
      )}
    </main>
  );
}
