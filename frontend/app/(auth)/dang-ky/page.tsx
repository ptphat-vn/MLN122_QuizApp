'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { useAuthStore } from '@/stores/authStore';

const registerSchema = z
  .object({
    name: z.string().min(2, 'Tên cần ít nhất 2 ký tự'),
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(8, 'Mật khẩu cần ít nhất 8 ký tự'),
    confirmPassword: z.string().min(8, 'Mật khẩu xác nhận cần ít nhất 8 ký tự'),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: 'Mật khẩu xác nhận chưa khớp',
    path: ['confirmPassword'],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerAccount } = useAuthStore();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const password = useWatch({ control, name: 'password', defaultValue: '' });
  const passwordStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    return score;
  }, [password]);

  const strengthLabel = ['Yếu', 'Trung bình', 'Khá', 'Mạnh'];

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerAccount(values.name, values.email, values.password);
      toast.success('Tạo tài khoản thành công');
      router.push('/dashboard');
    } catch {
      toast.error('Đăng ký thất bại, vui lòng thử lại.');
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="pointer-events-none fixed left-1/2 top-0 size-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mln-red/8 blur-3xl" />

      <div className="relative w-full max-w-sm animate-fade-in">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-sm text-mln-dim transition hover:text-mln-cream"
        >
          ← Về trang chủ
        </Link>

        <div className="glass-card p-8">
          <div className="mb-6 flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark text-base font-bold text-white shadow-lg shadow-mln-red/30">
              ★
            </span>
            <span className="text-lg font-bold text-mln-cream">MLN122</span>
          </div>

          <h1 className="text-2xl font-bold text-mln-cream">Tạo tài khoản</h1>
          <p className="mt-1 text-sm text-mln-dim">
            Quản lý bộ đề và mở phòng thi trực tiếp.
          </p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-mln-dim"
              >
                Họ và tên
              </label>
              <input
                id="name"
                type="text"
                {...register('name')}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:ring-2 focus:ring-mln-red/10"
                placeholder="Nguyễn Văn A"
              />
              {errors.name ? (
                <p className="mt-1.5 text-xs text-mln-red-light">
                  {errors.name.message}
                </p>
              ) : null}
            </div>

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
              {/* Password strength bar */}
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-mln-surface">
                <div
                  className="h-full rounded-full bg-linear-to-r from-mln-red to-mln-gold transition-all duration-300"
                  style={{ width: `${passwordStrength * 25}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-mln-dim">
                Độ mạnh: {strengthLabel[Math.max(passwordStrength - 1, 0)]}
              </p>
              {errors.password ? (
                <p className="mt-1.5 text-xs text-mln-red-light">
                  {errors.password.message}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-1.5 block text-sm font-medium text-mln-dim"
              >
                Xác nhận mật khẩu
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword')}
                className="w-full rounded-xl border border-white/10 bg-white/6 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:ring-2 focus:ring-mln-red/10"
                placeholder="••••••••"
              />
              {errors.confirmPassword ? (
                <p className="mt-1.5 text-xs text-mln-red-light">
                  {errors.confirmPassword.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 w-full rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark py-3 font-semibold text-white shadow-lg shadow-mln-red/20 transition hover:brightness-110 disabled:opacity-60"
            >
              {isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-mln-dim">
            Đã có tài khoản?{' '}
            <Link
              href="/dang-nhap"
              className="font-medium text-mln-red transition hover:text-mln-red-light"
            >
              Đăng nhập ngay
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
