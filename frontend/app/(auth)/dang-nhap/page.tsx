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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-0 h-96 w-96 -translate-y-1/2 rounded-full bg-mln-red/12 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-mln-gold/8 blur-3xl" />
      </div>

      {/* Decorative formula watermark */}
      <p className="pointer-events-none absolute right-8 top-20 hidden select-none font-mono text-7xl font-black text-mln-red/6 lg:block">
        T&nbsp;—&nbsp;H&nbsp;—&nbsp;T&apos;
      </p>
      <p className="pointer-events-none absolute left-6 bottom-24 hidden select-none font-mono text-4xl font-black text-mln-gold/5 lg:block">
        m = T&apos; - T
      </p>

      <div className="relative w-full max-w-md animate-fade-in">
        <Link
          href="/noi-dung"
          className="mb-5 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-mln-dim transition hover:text-mln-cream"
        >
          ← Về trang nội dung
        </Link>

        {/* Card */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 shadow-2xl shadow-black/60 backdrop-blur-xl ring-1 ring-mln-red/15">
          {/* Top accent */}
          <div className="mln-top-bar" />

          {/* Card header */}
          <div className="border-b border-white/8 bg-linear-to-r from-mln-red/20 via-mln-red/8 to-transparent px-7 py-5">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-xl bg-mln-red/20 text-xl text-mln-gold ring-1 ring-mln-red/30">
                ★
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-mln-dim">
                  Kinh Tế Chính Trị Mác-Lênin
                </p>
                <p className="mt-0.5 text-sm font-extrabold uppercase tracking-wide text-mln-cream">
                  Cổng Giảng Viên · MLN122
                </p>
              </div>
            </div>
          </div>

          <div className="px-7 py-7">
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-mln-cream">
              Đăng nhập
            </h1>
            <p className="mt-1 text-sm text-mln-dim">
              Quản lý bộ đề và mở phòng thi trực tiếp.
            </p>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
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
                {errors.password ? (
                  <p className="mt-1.5 text-xs text-mln-red-light">
                    {errors.password.message}
                  </p>
                ) : null}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-2 w-full rounded-xl bg-linear-to-br from-mln-red to-mln-red-dark py-3 font-bold uppercase tracking-widest text-white shadow-lg shadow-mln-red/25 transition hover:brightness-110 disabled:opacity-60"
              >
                {isSubmitting ? 'Đang xác thực...' : 'Đăng nhập'}
              </button>
            </form>

            <div className="mt-5 border-t border-white/8 pt-5">
              <p className="text-center text-sm text-mln-dim">
                Chưa có tài khoản?{' '}
                <Link
                  href="/dang-ky"
                  className="font-bold text-mln-red transition hover:text-mln-red-light"
                >
                  Đăng ký ngay
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Lenin quote */}
        <blockquote className="mt-4 rounded-xl border border-mln-gold/20 bg-mln-gold/5 px-5 py-3.5 text-xs italic text-mln-dim">
          &ldquo;Học, học nữa, học mãi.&rdquo;{' '}
          <cite className="not-italic font-bold text-mln-gold/80">
            — V.I. Lê-nin
          </cite>
        </blockquote>
      </div>
    </main>
  );
}
