import Image from 'next/image';

export default function PlantDetailInfo({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl: string;
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex  gap-4">
        <Image
          src={photoUrl}
          alt={name}
          width={200}
          height={200}
          className="rounded-lg"
        />
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
    </div>
  );
}
