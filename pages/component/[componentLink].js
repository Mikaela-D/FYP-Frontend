import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ComponentDetailPage = () => {
  const { query } = useRouter();
  const { componentLink } = query; // This will be the dynamic part of the URL
  const [componentData, setComponentData] = useState(null);

  useEffect(() => {
    if (componentLink) {
      fetch("/component-library.json")
        .then((response) => response.json())
        .then((data) => {
          const component = data.find((c) => c.link === componentLink);
          setComponentData(component);
        });
    }
  }, [componentLink]);

  if (!componentData) return <div>Loading...</div>;

  return (
    <div>
      <h1>{componentData.name}</h1>
      <p>{componentData.description}</p>
      <img src={componentData.image} alt={componentData.name} />
      {/* Add more content like tabs or slides here */}
    </div>
  );
};

export default ComponentDetailPage;
