'use client';
import {Button} from "@/components/ui/button"
import {useRouter} from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
      <main className="min-h-screen flex flex-col items-center justify-center ">
        <section className="text-center px-6">
          <h1 className="text-5xl font-extrabold mb-5">Student Performance Predictor</h1>
          <p className="text-2xl mb-8">
            It will predict how well a student will perform based on there attributes such as previous score, number of hours studied and others attributes.
          </p>
          <Button onClick={() => router.push('/predict')} className="bg-black hover:bg-transparent transition text-3xl text-blue-100">Get Started</Button>
        </section>
      </main>
  );
}
