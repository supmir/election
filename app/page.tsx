import Display from "@/components/display";
import { color_map, data } from "@/data";
export default async function Home() {

  return <Display data={data} colorMap={color_map} />;
}


