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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-mln-red/12 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-mln-gold/8 blur-3xl" />
      </div>

      {/* Decorative watermarks */}
      <p className="pointer-events-none absolute left-8 top-20 hidden select-none font-mono text-6xl font-black text-mln-red/5 lg:block">
        G = c + v + m
      </p>

      <div className="relative w-full max-w-md animate-fade-in">
        <Link
          href="/noi-dung"
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mln-dim transition hover:text-mln-cream"
        >
          ← Về trang nội dung
        </Link>

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 shadow-2xl shadow-black/60 backdrop-blur-xl ring-1 ring-mln-red/15">
          <div className="mln-top-bar" />

          {/* Card header */}
          <div className="border-b border-white/8 bg-linear-to-r from-mln-red/20 via-mln-red/8 to-transparent px-7 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mln-red/20 text-xl text-mln-gold ring-1 ring-mln-red/30">★</span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-mln-dim">Kinh Tế Chính Trị Mác-Lênin</p>
                <p className="mt-0.5 text-sm font-extrabold uppercase tracking-wide text-mln-cream">Tạo Tài Khoản · MLN122</p>
              </div>
            </div>
          </div>

          <div className="px-7 py-7">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-mln-cream">Đăng ký</h1>
            <p className="mt-1 text-sm text-mln-dim">
              Quản lý bộ đề và mở phòng thi trực tiếp.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
                >
                  Họ và tên
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
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
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...register('email')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
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
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  {...register('password')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
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
                  Độ mạnh: <span className="font-semibold text-mln-cream/70">{strengthLabel[Math.max(passwordStrength - 1, 0)]}</span>
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
                  className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-mln-dim"
                >
                  Xác nhận mật khẩu
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-mln-cream outline-none transition placeholder:text-mln-surface focus:border-mln-red/50 focus:bg-mln-red/5 focus:ring-2 focus:ring-mln-red/15"
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
                className="mt-2 w-full rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110 disabled:opacity-60"
              >
                {isSubmitting ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
              </button>
            </form>

            <div className="mt-5 border-t border-white/8 pt-5">
              <p className="text-center text-sm text-mln-dim">
                Đã có tài khoản?{' '}
                <Link
                  href="/dang-nhap"
                  className="font-bold text-mln-red transition hover:text-mln-red-light"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>

        <blockquote className="mt-4 rounded-xl border border-mln-gold/20 bg-mln-gold/5 px-5 py-3.5 text-xs italic text-mln-dim">
          &ldquo;Lao động là nguồn gốc của mọi của cải.&rdquo;{' '}
          <cite className="not-italic font-bold text-mln-gold/80">— K. Marx</cite>
        </blockquote>
      </div>
    </main>
  );
    </main>
  );
}
