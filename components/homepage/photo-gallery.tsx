import Image from "next/image";

const galleryImages = [
  { id: 1, src: "/gallery/model.jpg" }, 
  { id: 2, src: "/gallery/model_2.jpg" },
  { id: 3, src: "/gallery/model_3.jpg" },
  { id: 4, src: "/gallery/model_4_v2.jpg" },
  { id: 5, src: "/gallery/model_5.jpg" },
  { id: 6, src: "/gallery/model_9.jpg" },
  { id: 7, src: "/gallery/model_7.jpg" },
  { id: 8, src: "/gallery/model_8.jpg" },
];

export default function InstagramStyleGallery() {
  return (
    <section className="w-full py-10 lg:py-16">
      <div className="site-shell">
        
        <div className="grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4">
          {galleryImages.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square overflow-hidden bg-black"
            >
              <Image
                src={photo.src}
                alt={`Gallery image ${photo.id}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-105 group-hover:brightness-90"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
