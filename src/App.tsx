import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import BlurText from "./components/ui/blurtext";

/* ── fade-in hook ── */
function useFadeIn() {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    el.classList.remove("opacity-0", "translate-y-8");
                    el.classList.add("opacity-100", "translate-y-0");
                    obs.unobserve(el);
                }
            },
            { threshold: 0.12 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, []);
    return ref;
}

const DEMO = [
    { from: "user", text: "Hei AI, apa yang bisa kamu lakukan?" },
    {
        from: "ai",
        text: "Aku bisa menjawab pertanyaan, menulis kode, merangkum teks, dan masih banyak lagi!",
    },
    { from: "user", text: "Keren! Bisa bantu saya belajar React?" },
    {
        from: "ai",
        text: "Tentu! Mari mulai dari dasar hingga hooks dan state management. Siap?",
    },
];

const FEATURES = [
    {
        icon: "⚡",
        title: "Respon Cepat & Cerdas",
        desc: "Jawaban dalam milidetik. Dioptimalkan untuk kecepatan ekstrem tanpa mengorbankan kualitas.",
    },
    {
        icon: "🧠",
        title: "Memahami Konteks",
        desc: "AI yang benar-benar mengerti percakapanmu dari awal hingga akhir, bukan sekadar kata per kata.",
    },
    {
        icon: "🌐",
        title: "Multi-Platform",
        desc: "Web, iOS, dan Android. Pengalaman konsisten di semua perangkat kapan saja.",
    },
    {
        icon: "🔒",
        title: "Keamanan Terjamin",
        desc: "Data percakapanmu dienkripsi end-to-end. Privasi adalah prioritas utama kami.",
    },
    {
        icon: "🎨",
        title: "Customizable AI",
        desc: "Atur persona dan gaya bahasa AI sesuai kebutuhanmu — jadikan ia benar-benar milikmu.",
    },
    {
        icon: "📊",
        title: "Analitik Pintar",
        desc: "Lacak produktivitas dan insight percakapan dengan dashboard yang intuitif.",
    },
];

const TESTIMONIALS = [
    {
        avatar: "👨‍💻",
        name: "Rizky F.",
        role: "Software Engineer",
        quote: "AI-nya ngerti banget konteks percakapanku. Jauh lebih canggih dari yang pernah aku coba!",
    },
    {
        avatar: "👩‍🎨",
        name: "Sari M.",
        role: "UI/UX Designer",
        quote: "Bantu aku buat copywriting produk dalam hitungan detik. Simple tapi powerful.",
    },
    {
        avatar: "👨‍🎓",
        name: "Budi H.",
        role: "Mahasiswa S2",
        quote: "Ngebantu banget untuk riset dan merangkum jurnal panjang. Hemat waktu banget!",
    },
];

export default function App() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [shown, setShown] = useState(0);

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 30);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    useEffect(() => {
        if (shown >= DEMO.length) return;
        const t = setTimeout(() => setShown((p) => p + 1), 900 + shown * 700);
        return () => clearTimeout(t);
    }, [shown]);

    const featRef = useFadeIn();
    const demoRef = useFadeIn();
    const testRef = useFadeIn();
    const ctaRef = useFadeIn();

    return (
        <div className="bg-[#0c0c0c] text-[#f0f0f0] font-sans overflow-x-hidden">
            {/* ── NAVBAR ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-300 ${
                    scrolled
                        ? "bg-[#0c0c0c]/90 backdrop-blur-md border-b border-white/5"
                        : "bg-transparent"
                }`}
            >
                <div className="flex items-center gap-2">
                    <span className="text-2xl">👾</span>
                    <span className="text-xl font-black text-white">
                        Mbah AI
                    </span>
                </div>

                {/* desktop */}
                <div className="hidden md:flex items-center gap-8">
                    {["#features:Fitur", "#demo:Demo", "#contact:Kontak"].map(
                        (s) => {
                            const [href, label] = s.split(":");
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className="text-[#888] hover:text-white text-sm transition-colors"
                                >
                                    {label}
                                </a>
                            );
                        },
                    )}
                    <Link
                        to="/login"
                        className="bg-white text-[#0c0c0c] font-bold text-sm px-5 py-2 rounded-full hover:bg-gray-100 transition-all hover:-translate-y-0.5"
                    >
                        Masuk / Daftar
                    </Link>
                </div>

                {/* hamburger */}
                <button
                    className="md:hidden text-white bg-transparent border-none text-xl cursor-pointer"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="menu"
                >
                    {menuOpen ? "✕" : "☰"}
                </button>

                {menuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-[#0c0c0c]/98 backdrop-blur-md border-b border-white/5 flex flex-col gap-5 px-6 py-5 z-50">
                        {[
                            "#features:Fitur",
                            "#demo:Demo",
                            "#contact:Kontak",
                        ].map((s) => {
                            const [href, label] = s.split(":");
                            return (
                                <a
                                    key={href}
                                    href={href}
                                    className="text-[#888] hover:text-white text-sm"
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {label}
                                </a>
                            );
                        })}
                        <Link
                            to="/login"
                            className="bg-white text-[#0c0c0c] font-bold text-center py-2 rounded-full"
                            onClick={() => setMenuOpen(false)}
                        >
                            Masuk / Daftar
                        </Link>
                    </div>
                )}
            </nav>

            {/* ── HERO ── */}
            <section className="min-h-screen flex items-center justify-center bg-[#0c0c0c] relative overflow-hidden pt-20">
                {/* dot grid */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#ffffff06 1px, transparent 1px)",
                        backgroundSize: "36px 36px",
                    }}
                />
                {/* soft center glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse 70% 55% at 50% 40%, rgba(255,255,255,.04) 0%, transparent 70%)",
                    }}
                />

                <div className="relative z-10 text-center max-w-2xl px-6">
                    {/* badge */}
                    <div className="inline-block bg-[#1a1a1a] border border-[#2a2a2a] rounded-full px-4 py-1.5 text-xs text-[#888] mb-6 tracking-widest">
                        ✦ Chat AI Generasi Terbaru
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black leading-[1.06] mb-5 text-white">
                        <BlurText
                            text="Chat dengan AI Masa Depan"
                            className="justify-center tracking-tighter items-center "
                        />
                    </h1>

                    <p className="text-base md:text-lg text-[#666] mb-10 leading-relaxed">
                        Responsif, cerdas, selalu siap membantu kamu —
                        <br className="hidden md:block" /> kapan saja, di mana
                        saja.
                    </p>

                    <Link
                        to="/chat"
                        className="inline-block bg-white text-[#0c0c0c] font-bold text-base px-9 py-3.5 rounded-full hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,.12)]"
                    >
                        Mulai Chat →
                    </Link>

                    {/* avatar */}
                    <div className="flex justify-center mt-14">
                        <div
                            className="w-36 h-36 rounded-full bg-[#141414] border border-[#2a2a2a] flex items-center justify-center text-6xl"
                            style={{
                                animation: "float 6s ease-in-out infinite",
                                boxShadow: "0 0 60px rgba(255,255,255,.04)",
                            }}
                        >
                            👾
                        </div>
                    </div>

                    {/* stats */}
                    <div className="flex justify-center gap-12 mt-12 flex-wrap">
                        {[
                            ["1+", "Pengguna Aktif"],
                            ["99.9%", "Uptime"],
                            ["< 1s", "Respon AI"],
                        ].map(([v, l]) => (
                            <div key={l} className="text-center mb-5">
                                <div className="text-2xl font-black text-white">
                                    {v}
                                </div>
                                <div className="text-xs text-[#555] mt-1 ">
                                    {l}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── FEATURES ── */}
            <section id="features" className="py-28 px-6 bg-[#0c0c0c]">
                <div
                    ref={featRef}
                    className="max-w-5xl mx-auto opacity-0 translate-y-8 transition-all duration-700"
                >
                    <SectionLabel>KENAPA MEMILIH KAMI</SectionLabel>
                    <SectionTitle>Fitur Unggulan</SectionTitle>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
                        {FEATURES.map((f, i) => (
                            <FeatCard key={f.title} {...f} delay={i * 80} />
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── DEMO ── */}
            <section id="demo" className="py-28 px-6 bg-[#080808]">
                <div
                    ref={demoRef}
                    className="max-w-xl mx-auto opacity-0 translate-y-8 transition-all duration-700"
                >
                    <SectionLabel>LIVE PREVIEW</SectionLabel>
                    <SectionTitle>Demo Chat</SectionTitle>

                    <div className="mt-10 bg-[#0e0e0e] border border-[#1e1e1e] rounded-2xl overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,.6)]">
                        {/* title bar */}
                        <div className="flex items-center gap-2 px-5 py-3 bg-[#111] border-b border-[#1c1c1c]">
                            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
                            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
                            <span className="ml-auto text-xs text-[#444]">
                                Chat AI — Demo
                            </span>
                        </div>

                        {/* messages */}
                        <div className="p-5 flex flex-col gap-3 min-h-[240px]">
                            {DEMO.slice(0, shown).map((m, i) => (
                                <div
                                    key={i}
                                    className={`flex items-end gap-2 ${m.from === "user" ? "flex-row-reverse" : "flex-row"}`}
                                    style={{ animation: "slideIn .35s ease" }}
                                >
                                    <span className="text-xl flex-shrink-0">
                                        {m.from === "ai" ? "🤖" : "👤"}
                                    </span>
                                    <div
                                        className={`text-sm px-4 py-2.5 rounded-2xl max-w-[78%] leading-relaxed ${
                                            m.from === "user"
                                                ? "bg-[#1e1e1e] border border-[#2e2e2e] text-[#ddd] rounded-br-sm"
                                                : "bg-[#181818] border border-[#2a2a2a] text-[#bbb] rounded-bl-sm"
                                        }`}
                                    >
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {shown < DEMO.length && (
                                <p
                                    className="text-xs text-[#444] pl-9"
                                    style={{
                                        animation:
                                            "blink 1s step-start infinite",
                                    }}
                                >
                                    AI mengetik▋
                                </p>
                            )}
                        </div>

                        {/* input bar */}
                        <div className="flex items-center gap-3 px-5 py-4 border-t border-[#1c1c1c]">
                            <div className="flex-1 bg-[#0c0c0c] border border-[#1e1e1e] rounded-full px-4 py-2 text-sm text-[#444]">
                                Ketik pesanmu…
                            </div>
                            <Link
                                to="/login"
                                className="w-10 h-10 flex-shrink-0 bg-white rounded-full flex items-center justify-center text-[#0c0c0c] font-black text-sm hover:bg-gray-100 transition-all"
                            >
                                →
                            </Link>
                        </div>
                    </div>

                    <p className="text-center text-[#444] text-sm mt-6">
                        <Link
                            to="/login"
                            className="text-[#888] hover:text-white underline underline-offset-2 transition-colors"
                        >
                            Login untuk mulai chat sungguhan →
                        </Link>
                    </p>
                </div>
            </section>

            <Divider />

            {/* ── TESTIMONIALS ── */}
            <section className="py-28 px-6 bg-[#0c0c0c]">
                <div
                    ref={testRef}
                    className="max-w-5xl mx-auto opacity-0 translate-y-8 transition-all duration-700"
                >
                    <SectionLabel>APA KATA MEREKA</SectionLabel>
                    <SectionTitle>User Feedback</SectionTitle>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-12">
                        {TESTIMONIALS.map((t) => (
                            <div
                                key={t.name}
                                className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 hover:border-[#333] transition-colors"
                            >
                                <div className="text-[#555] mb-3">★★★★★</div>
                                <p className="text-[#777] text-sm leading-relaxed mb-5">
                                    "{t.quote}"
                                </p>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{t.avatar}</span>
                                    <div>
                                        <div className="font-bold text-sm text-[#ddd]">
                                            {t.name}
                                        </div>
                                        <div className="text-xs text-[#444]">
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Divider />

            {/* ── CTA ── */}
            <section className="py-28 px-6 bg-[#080808]">
                <div
                    ref={ctaRef}
                    className="max-w-xl mx-auto text-center opacity-0 translate-y-8 transition-all duration-700"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
                        Siap untuk
                        <br />
                        Memulai?
                    </h2>
                    <p className="text-[#666] text-base leading-relaxed mb-10">
                        Bergabunglah bersama ribuan pengguna. Gratis, tanpa
                        perlu kartu kredit.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/login"
                            className="bg-white text-[#0c0c0c] font-bold text-base px-9 py-3.5 rounded-full hover:bg-gray-100 transition-all hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,255,255,.12)]"
                        >
                            Coba Gratis Sekarang →
                        </Link>
                        <Link
                            to="/login"
                            className="border border-[#333] text-[#888] font-semibold text-base px-8 py-3.5 rounded-full hover:border-[#666] hover:text-white transition-all hover:-translate-y-0.5"
                        >
                            Sudah punya akun? Masuk
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── FOOTER ── */}
            <footer
                id="contact"
                className="bg-[#080808] border-t border-[#141414]"
            >
                <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">🤖</span>
                            <span className="font-black text-white">
                                Chat AI
                            </span>
                        </div>
                        <p className="text-[#444] text-xs leading-relaxed">
                            AI percakapan generasi berikutnya.
                            <br />
                            Cerdas, cepat, selalu siap membantu.
                        </p>
                    </div>

                    {[
                        {
                            title: "PRODUK",
                            links: ["Fitur", "Demo"],
                        },
                        {
                            title: "PERUSAHAAN",
                            links: ["Tentang Kami"],
                        },
                        {
                            title: "SOSIAL",
                            links: ["GitHub"],
                        },
                    ].map(({ title, links }) => (
                        <div key={title}>
                            <h4 className="text-[#444] text-xs font-bold tracking-widest mb-4">
                                {title}
                            </h4>
                            {links.map((l) => (
                                <a
                                    key={l}
                                    href="#"
                                    className="block text-[#666] hover:text-[#ddd] text-sm mb-2.5 transition-colors"
                                >
                                    {l}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="border-t border-[#141414] max-w-5xl mx-auto px-6 py-5 flex justify-between items-center flex-wrap gap-3">
                    <p className="text-[#333] text-xs">
                        © {new Date().getFullYear()} Chat AI. All rights
                        reserved.
                    </p>
                    <div className="flex gap-5">
                        {["Privacy Policy", "Terms of Service"].map((l) => (
                            <a
                                key={l}
                                href="#"
                                className="text-[#444] hover:text-[#888] text-xs transition-colors"
                            >
                                {l}
                            </a>
                        ))}
                    </div>
                </div>
            </footer>

            {/* ── global keyframes (minimal, hanya yg tidak bisa Tailwind) ── */}
            <style>{`
                @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
                @keyframes slideIn  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:none} }
                @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
            `}</style>
        </div>
    );
}

/* ── helpers ── */
function Divider() {
    return (
        <div className="h-px bg-gradient-to-r from-transparent via-[#222] to-transparent" />
    );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <p className="text-[#555] text-xs tracking-[.14em] mb-3 text-center">
            {children}
        </p>
    );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-3xl md:text-4xl font-black text-white text-center">
            {children}
        </h2>
    );
}

function FeatCard({
    icon,
    title,
    desc,
    delay,
}: {
    icon: string;
    title: string;
    desc: string;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setTimeout(() => {
                        el.classList.remove("opacity-0", "translate-y-6");
                        el.classList.add("opacity-100", "translate-y-0");
                    }, delay);
                    obs.unobserve(el);
                }
            },
            { threshold: 0.1 },
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [delay]);

    return (
        <div
            ref={ref}
            className="opacity-0 translate-y-6 transition-all duration-500 bg-[#141414] border border-[#222] rounded-2xl p-7 hover:border-[#3a3a3a] hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,.4)] cursor-default"
        >
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="font-bold text-[#e8e8e8] mb-2">{title}</h3>
            <p className="text-[#555] text-sm leading-relaxed">{desc}</p>
        </div>
    );
}
