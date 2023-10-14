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
      <h1>Social Butter Main Page</h1>
      <p className="text w-1">Expore more Activities</p>
      <button >show more</button>
    </div>
  );
}
