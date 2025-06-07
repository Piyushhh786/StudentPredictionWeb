'use client';

import { useState,useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';


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
  } = useForm<FormData>();
  type Features = {
  "Hours Studied": string;
  "Previous Scores": string;
  "Extracurricular Activities": 'Yes' | 'No';
  "Sleep Hours": string;
  "Sample Question Papers Practiced": string;
};
  type FormData = {
    features: Features;
  };

  const onSubmit: SubmitHandler<FormData> = async (data:FormData) => {
   
    try {
        console.log(JSON.stringify(data));
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
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-gray-200 to-gray-400 p-4">
      <h1 className="text-4xl font-bold text-black text-center mb-6">
        Student Performance Predictor
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        {/* Hours Studied */}
        <div>
          <Label className='mb-3' >Hours Studied</Label>
          <Input type="number" {...register('features.Hours Studied', { required: true })} />
          {errors.features?.['Hours Studied'] && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Previous Score */}
        <div>
          <Label className='mb-3'>Previous Score</Label>
          <Input type="number" {...register('features.Previous Scores', { required: true })} />
          {errors.features?.['Previous Scores'] && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Extracurricular Activities */}
        <div>
          <Label className='mb-3'>Extracurricular Activities</Label>
          <select
            className="w-full border border-gray-300 rounded-md p-2"
            {...register('features.Extracurricular Activities', { required: true })}
          >
            <option value="">Select</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.features?.['Extracurricular Activities'] && <p className="text-red-500 text-sm">Required</p>}
        </div>
        {/* Sleep Hours */}
        <div>
          <Label className='mb-3'>Sleep Hours</Label>
          <Input type="number" {...register('features.Sleep Hours', { required: true })} />
          {errors.features?.['Sleep Hours'] && <p className="text-red-500 text-sm">Required</p>}
        </div>

        {/* Question Papers Practiced */}
        <div>
          <Label className='mb-3'>Sample Question Papers Practiced</Label>
          <Input type="number" {...register('features.Sample Question Papers Practiced', { required: true })} />
          {errors.features?.['Sample Question Papers Practiced'] && <p className="text-red-500 text-sm">Required</p>}
        </div>


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
