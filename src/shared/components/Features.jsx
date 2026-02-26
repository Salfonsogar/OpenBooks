import FeatureCard from "./FeatureCard";

export default function Features({ items }) {
  return (
    <section className="row text-center">
      {items.map((item, index) => (
        <FeatureCard
          key={index}
          title={item.title}
          text={item.text}
          to={item.to}
          buttonText={item.buttonText}
        />
      ))}
    </section>
  );
}
