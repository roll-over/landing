import db from "$lib/db";
import { makeTranscribationFromRuToEn } from "$lib/transcribation";

export async function GET(event) {
  const countryObject = await (await db()).collection("countries").findOne({
    id: event.params.country,
  });

  return new Response(
    JSON.stringify(
      (
        await (
          await db()
        )
          .collection("cities")
          .find({
            countryId: event.params.country,
          })
          .toArray()
      ).map((city) => ({
        value: city.id,
        label: city[event.params.lang] || city.id,
      })),
    ),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    },
  );
}
