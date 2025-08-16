import SignUpForm from '@/components/auth/SignUpForm';

export default function SignUpPage() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="w-full max-w-md p-8 space-y-8 bg-card text-card-foreground rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">Create an Account</h1>
        <SignUpForm />
      </div>
    </div>
  );
}
