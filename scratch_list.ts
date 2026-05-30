import { episodes } from "./src/data/episodes";
episodes.forEach((ep, i) => console.log(`${i + 1}. [${ep.id}] ${ep.guestName} - ${ep.title}`));
