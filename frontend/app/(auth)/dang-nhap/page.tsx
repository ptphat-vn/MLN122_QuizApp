'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/authStore';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu cần ít nhất 6 ký tự'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values.email, values.password);
      toast.success('Đăng nhập thành công');
      router.push('/dashboard');
    } catch {
      toast.error('Đăng nhập thất bại, vui lòng kiểm tra lại thông tin.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      {/* background orb */}
      <div className="pointer-events-none fixed left-1/2 top-0 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mln-red/8 blur-3xl" />

      <div className="relative w-full max-w-sm animate-fade-in">
        {/* Back link */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-mln-dim transition hover:text-mln-cream"
        >
          ← Về trang chủ
        </Link>

        <div className="glass-card p-8">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark text-base font-bold text-white shadow-lg shadow-mln-red/30">
              ★
            </span>
            <span className="text-lg font-bold text-mln-cream">MLN122</span>
          </div>

          <h1 className="text-2xl font-bold text-mln-cream">Đăng nhập</h1>
          <p className="mt-1 text-sm text-mln-dim">
            Quản lý bộ đề và mở phòng thi trực tiếp.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-mln-dim"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email')}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:ring-2 focus:ring-mln-red/10"
                placeholder="teacher@school.vn"
              />
              {errors.email ? (
                <p className="mt-1.5 text-xs text-mln-red-light">
                  {errors.email.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-mln-dim"
              >
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                {...register('password')}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:ring-2 focus:ring-mln-red/10"
                placeholder="••••••••"
              />
              {errors.password ? (
                <p className="mt-1.5 text-xs text-mln-red-light">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark py-3 font-semibold text-white shadow-lg shadow-mln-red/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-mln-dim">
            Chưa có tài khoản?{' '}
            <Link
              href="/dang-ky"
              className="font-medium text-mln-red transition hover:text-mln-red-light"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
