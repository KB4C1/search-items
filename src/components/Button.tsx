export default function Button(props: { onclick?: () => void; text: string }) {
  return (
    <button
      onClick={props.onclick}
      className="
        bg-white border border-solid border-[#00A833] rounded-xl py-2 px-4
        text-[#00A833] transition-colors duration-200
        hover:bg-[#00A833] hover:text-white hover:animate-btn-hover"
    >
      <strong>{props.text}</strong>
    </button>
  );
}
