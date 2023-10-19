import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Social Butter" },
    { name: "description", content: "Have fun together" },
  ];
};

export default function Index() {
  return (
    <div className="text-3xl font-bold underline">
      <iframe
        title="activities-map"
        width="450"
        height="250"
        style={{marginRight: '0em'}}
        src="https://www.google.com/maps/embed/v1/MAP_MODE?key=AIzaSyCl9yphl_MMF66EyGRwd_aPEzxBy0qT-do"
      ></iframe>
      <button>show more</button>
    </div>
  );
}
