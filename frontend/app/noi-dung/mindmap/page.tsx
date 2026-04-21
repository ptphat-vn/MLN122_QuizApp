import Link from 'next/link';

import LandingSwitchNav from '@/components/shared/LandingSwitchNav';

type Tone = 'violet' | 'cyan' | 'lime' | 'amber' | 'pink';

type BranchNode = {
  title: string;
  details?: string[];
};

type Branch = {
  title: string;
  tone: Tone;
  nodes: BranchNode[];
};

type MindmapSection = {
  title: string;
  center: string;
  branches: Branch[];
  minWidth: string;
};

const toneStyles: Record<
  Tone,
  { header: string; line: string; node: string; detail: string }
> = {
  violet: {
    header:
      'border-red-500/55 bg-red-950/35 text-red-100 shadow-[0_0_24px_rgba(239,68,68,0.18)]',
    line: 'before:bg-red-400/50 after:border-red-400/50',
    node: 'border-red-500/45 bg-red-950/20 text-red-100',
    detail: 'border-red-400/30 bg-red-950/12 text-red-100/85',
  },
  cyan: {
    header:
      'border-amber-500/55 bg-amber-950/35 text-amber-100 shadow-[0_0_24px_rgba(245,158,11,0.18)]',
    line: 'before:bg-amber-400/50 after:border-amber-400/50',
    node: 'border-amber-500/45 bg-amber-950/20 text-amber-100',
    detail: 'border-amber-400/30 bg-amber-950/12 text-amber-100/85',
  },
  lime: {
    header:
      'border-emerald-600/55 bg-emerald-950/35 text-emerald-100 shadow-[0_0_24px_rgba(16,185,129,0.14)]',
    line: 'before:bg-emerald-500/50 after:border-emerald-500/50',
    node: 'border-emerald-600/45 bg-emerald-950/20 text-emerald-100',
    detail: 'border-emerald-500/30 bg-emerald-950/12 text-emerald-100/85',
  },
  amber: {
    header:
      'border-yellow-500/55 bg-yellow-950/35 text-yellow-100 shadow-[0_0_24px_rgba(234,179,8,0.16)]',
    line: 'before:bg-yellow-400/50 after:border-yellow-400/50',
    node: 'border-yellow-500/45 bg-yellow-950/20 text-yellow-100',
    detail: 'border-yellow-400/30 bg-yellow-950/12 text-yellow-100/85',
  },
  pink: {
    header:
      'border-rose-500/55 bg-rose-950/35 text-rose-100 shadow-[0_0_24px_rgba(244,63,94,0.16)]',
    line: 'before:bg-rose-400/50 after:border-rose-400/50',
    node: 'border-rose-500/45 bg-rose-950/20 text-rose-100',
    detail: 'border-rose-400/30 bg-rose-950/12 text-rose-100/85',
  },
};

const MINDMAPS: MindmapSection[] = [
  {
    title: 'Lý Luận Của C. Mác Về Giá Trị Thặng Dư',
    center: 'LÝ LUẬN CỦA C. MÁC VỀ GIÁ TRỊ THẶNG DƯ',
    minWidth: 'min-w-[1080px]',
    branches: [
      {
        title: 'a. Công thức chung của tư bản',
        tone: 'violet',
        nodes: [
          {
            title: 'Lưu thông hàng hóa (H - T - H)',
            details: ['Mua rẻ - bán đắt.'],
          },
          {
            title: "Lưu thông tư bản (T - H - T')",
            details: ['Ứng ra tiền mua TLSX và SLĐ, thu về nhiều tiền hơn.'],
          },
          {
            title: "Giá trị thặng dư (t = T' - T)",
            details: ['Phần chênh lệch lớn hơn là giá trị thặng dư.'],
          },
        ],
      },
      {
        title: 'b. Hàng hóa sức lao động',
        tone: 'cyan',
        nodes: [
          {
            title: 'Điều kiện trở thành hàng hóa',
            details: [
              'Sức lao động có thể thỏa mãn nhu cầu người khác và có thể mua bán.',
            ],
          },
          {
            title: 'Thuộc tính giá trị',
            details: [
              'Do lao động xã hội cần thiết để tái sản xuất sức lao động.',
            ],
          },
          {
            title: 'Thuộc tính giá trị sử dụng',
            details: [
              'Là khả năng lao động của con người khi tham gia sản xuất.',
            ],
          },
        ],
      },
      {
        title: 'c. Sản xuất giá trị thặng dư',
        tone: 'lime',
        nodes: [
          {
            title: 'Thời gian lao động tất yếu',
            details: ['Tạo ra giá trị sức lao động (v).'],
          },
          {
            title: 'Thời gian lao động thặng dư',
            details: ['Tạo ra giá trị thặng dư (m).'],
          },
          {
            title: 'Bản chất',
            details: ['m là lao động không công bị nhà tư bản chiếm đoạt.'],
          },
        ],
      },
      {
        title: 'd. Tư bản bất biến và khả biến',
        tone: 'amber',
        nodes: [
          {
            title: 'Tư bản bất biến (c)',
            details: [
              'Tư liệu sản xuất; chỉ chuyển giá trị, không tạo giá trị mới.',
            ],
          },
          {
            title: 'Tư bản khả biến (v)',
            details: ['Mua sức lao động; tạo ra giá trị mới (v + m).'],
          },
          { title: 'CÔNG THỨC GIÁ TRỊ HÀNG HÓA: G = c + (v + m)' },
        ],
      },
      {
        title: 'e. Tiền công, tuần hoàn và chu chuyển',
        tone: 'pink',
        nodes: [
          {
            title: 'Khái niệm tiền công',
            details: ['Giá cả của hàng hóa sức lao động.'],
          },
          {
            title: 'Bản chất',
            details: ['Công nhân tạo ra: v + m, nhưng chỉ nhận: v.'],
          },
          {
            title: 'Tuần hoàn tư bản',
            details: ["T - H - SX - H' - T' và T' chứa giá trị thặng dư (m)."],
          },
          {
            title: 'Chu chuyển tư bản',
            details: ['n = số vòng chu chuyển / thời gian (thường là 1 năm).'],
          },
        ],
      },
    ],
  },
  {
    title: 'Bản Chất Của Giá Trị Thặng Dư (m)',
    center: 'BẢN CHẤT CỦA m',
    minWidth: 'min-w-[980px]',
    branches: [
      {
        title: 'Khái niệm cốt lõi',
        tone: 'violet',
        nodes: [
          { title: 'Giá trị mới dôi ra' },
          { title: 'Do công nhân tạo ra' },
          { title: 'Nhà tư bản chiếm lấy' },
          { title: 'Lao động không được trả công' },
        ],
      },
      {
        title: 'Bản chất xã hội',
        tone: 'cyan',
        nodes: [
          { title: 'Quan hệ giai cấp' },
          { title: 'Thuê mướn sức lao động' },
          { title: 'Tuân thủ quy luật giá trị' },
          { title: 'Khai thác giá trị lớn hơn' },
        ],
      },
    ],
  },
  {
    title: 'Các Phương Pháp Sản Xuất Giá Trị Thặng Dư',
    center: 'PHƯƠNG PHÁP TẠO m',
    minWidth: 'min-w-[980px]',
    branches: [
      {
        title: 'Phương pháp tuyệt đối',
        tone: 'violet',
        nodes: [
          { title: 'Kéo dài ngày lao động' },
          { title: 'Giữ nguyên thời gian lao động tất yếu' },
          { title: "Tăng tỷ suất giá trị thặng dư (m')" },
          {
            title: 'Giới hạn',
            details: ['Sức khỏe con người', 'Đấu tranh của công nhân'],
          },
        ],
      },
      {
        title: 'Phương pháp tương đối',
        tone: 'cyan',
        nodes: [
          { title: 'Rút ngắn thời gian lao động tất yếu' },
          { title: 'Giữ nguyên độ dài ngày lao động' },
          { title: 'Tăng năng suất lao động xã hội' },
          { title: 'Giảm giá trị hàng hóa sinh hoạt' },
        ],
      },
      {
        title: 'Giá trị thặng dư siêu ngạch',
        tone: 'lime',
        nodes: [
          { title: 'Áp dụng công nghệ mới sớm hơn' },
          { title: 'Giá trị cá biệt thấp hơn giá trị xã hội' },
          { title: 'Động lực thúc đẩy kỹ thuật' },
          { title: 'Dẫn đến giá trị thặng dư tương đối' },
        ],
      },
    ],
  },
];

function BranchCard({ branch }: { branch: Branch }) {
  const tone = toneStyles[branch.tone];

  return (
    <article className="rounded-2xl border border-white/10 bg-black/28 p-4">
      <div className={`rounded-xl border px-4 py-3 ${tone.header}`}>
        <h3 className="text-sm font-bold uppercase tracking-wide sm:text-base">
          {branch.title}
        </h3>
      </div>

      <div className="mt-3 border-l-2 border-white/15 pl-3">
        <div className="space-y-2.5">
          {branch.nodes.map((node) => (
            <div
              key={node.title}
              className="relative pl-3 before:absolute before:left-0 before:top-3 before:h-px before:w-2.5 before:bg-white/20"
            >
              <div
                className={`rounded-lg border px-3 py-2.5 text-sm font-semibold leading-snug ${tone.node}`}
              >
                {node.title}
              </div>

              {node.details?.length ? (
                <ul className="mt-2 border-l border-white/15 pl-3 text-xs">
                  {node.details.map((detail) => (
                    <li
                      key={detail}
                      className={`relative mt-2 rounded-md border px-2.5 py-1.5 leading-relaxed before:absolute before:-left-3 before:top-1/2 before:h-px before:w-2 before:bg-white/20 ${tone.detail}`}
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function MindmapPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip">
      <LandingSwitchNav />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-mln-red/10 blur-3xl" />
        <div className="absolute right-4 top-1/3 h-72 w-72 rounded-full bg-mln-gold/8 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-mln-red/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl space-y-6 px-4 pb-16 pt-6 sm:px-6 sm:pt-8 lg:px-10">
        {/* Page header */}
        <header className="overflow-hidden rounded-3xl border border-white/8 bg-black/35 shadow-xl">
          <div className="mln-top-bar" />
          <div className="p-6 sm:p-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="mln-ink-badge">★ Mindmap</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-tight text-mln-cream sm:text-5xl">
              Sơ Đồ Tư Duy
            </h1>
            <p className="mt-2 text-sm text-mln-dim">
              Kinh Tế Chính Trị Mác-Lênin — MLN122
            </p>
            <div className="mt-5">
              <Link
                href="/noi-dung"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-mln-dim transition hover:bg-white/10 hover:text-mln-cream"
              >
                ← Quay lại nội dung
              </Link>
            </div>
          </div>
        </header>

        {MINDMAPS.map((map) => (
          <section
            key={map.title}
            className="overflow-hidden rounded-3xl border border-white/8 bg-black/30 shadow-xl"
          >
            <div className="h-0.5 w-full bg-linear-to-r from-mln-red/60 via-mln-gold/60 to-mln-red/60" />
            <div className="p-5 sm:p-7 lg:p-9">
              <div className="mb-6 flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-mln-red/20 text-sm text-mln-gold ring-1 ring-mln-red/25">
                  ★
                </span>
                <h2 className="text-xl font-black uppercase tracking-wide text-mln-cream sm:text-2xl">
                  {map.title}
                </h2>
              </div>

              <div className="overflow-x-auto pb-2">
                <div
                  className={`grid gap-5 lg:grid-cols-[260px_1fr] ${map.minWidth}`}
                >
                  <aside className="lg:sticky lg:top-24 lg:h-fit">
                    <div className="overflow-hidden rounded-2xl border-2 border-mln-red/40 bg-linear-to-br from-mln-red/18 to-mln-red/5 p-5 shadow-[0_0_40px_rgba(239,68,68,0.15)] ring-1 ring-mln-red/20">
                      <span className="mb-2 block text-lg text-mln-gold">
                        ★
                      </span>
                      <p className="text-sm font-extrabold uppercase leading-snug tracking-wide text-mln-cream">
                        {map.center}
                      </p>
                    </div>
                  </aside>

                  <div className="grid gap-4 xl:grid-cols-2">
                    {map.branches.map((branch) => (
                      <BranchCard key={branch.title} branch={branch} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
