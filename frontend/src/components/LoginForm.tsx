import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

// Zod schema for validation
const schema = z.object({
  userId: z.string().min(3, { message: 'UID must be at least 3 characters' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Type inference from Zod schema
type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Correct mutation with explicit typing
  const mutation = useMutation<AxiosResponse<any>, Error, FormData>({
    mutationFn: (data: FormData) =>
      axios.post('http://localhost:9000/api/auth/login', data, {
        headers: { 'Content-Type': 'application/json' },
      }),
  });

  // Submit handler
  const onSubmit = (data: FormData) => mutation.mutate(data);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Welcome back!</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* UID Input */}
          <input
            {...register('userId')}
            placeholder="UID"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.userId && <span className="text-red-500 text-sm">{errors.userId.message}</span>}

          {/* Password Input */}
          <input
            {...register('password')}
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#1F2A5B] text-white py-2 rounded-lg hover:bg-[#253373] transition"
          >
            Login
          </button>

          {/* Error or Success Messages */}
          {mutation.isError && (
            <div className="text-red-500 text-sm">
              Error: {(mutation.error as any)?.response?.data?.message || 'Invalid credentials'}
            </div>
          )}
          {mutation.isSuccess && (
            <div className="text-green-500 text-sm">Login successful!</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
