import { Star } from "lucide-react";

const reviews = [
  {
    name: "Tuli Chisim",
    copy: "Love their t-shirt designs and quality! ❤️",
  },
  {
    name: "Present Mankhin",
    copy: "T-shirt & Print Best Quality❤️",
  },
  {
    name: "Ranjit Ruga",
    copy: "All the best to Liquid! Good Luck!",
  },
  {
    name: "Sudha Ritchil",
    copy: "Highly Recommended! Amio Niechi 2ta! Onk bhalo quality",
  },
  {
    name: "Mrong Anindita",
    copy: "So beautiful our traditional T-shirts🤗🤗im so happy &Highly Recommend 😑",
  },
  {
    name: "Rafi Sircar",
    copy: "Like the design and quality. Highly recommend.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="site-shell py-10 lg:py-14">
      <div className="mb-8">
        <p className="card-fade text-xs uppercase tracking-[0.35em] text-white/45">Reviews</p>
        <h3 className="card-fade mt-3 text-3xl font-semibold md:text-4xl">What customers are saying</h3>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        {reviews.map((review, idx) => (
          <div
            key={`${review.name}-${idx}`}
            className="card-fade rounded-lg border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-4 flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-white text-white" />
              ))}
            </div>
            <p className="text-sm leading-7 text-white/65">“{review.copy}”</p>
            <p className="mt-5 text-sm font-medium text-white/85">{review.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
