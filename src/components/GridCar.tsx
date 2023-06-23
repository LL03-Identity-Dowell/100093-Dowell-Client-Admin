interface Props {
  image: string;
  text: string;
  link: string;
  size?: string;
}

const GridCard = ({ image, text, link, size }: Props) => {
  return (
    <div className="border-2 border-[#d8d8d8] rounded-2xl px-4 pb-4 flex flex-col">
      <span className="w-full flex justify-center">
        <img src={image} alt="" className="w-60" />
      </span>
      <p className={`${size ? size : 'text-xl'} text-[#7a7a7a]`}>{text}</p>
      <a href={link} className={`text-[#99cc00] ${size ? size : 'text-xl'} mt-2`}>
        Learn More
      </a>
    </div>
  );
};

export default GridCard;