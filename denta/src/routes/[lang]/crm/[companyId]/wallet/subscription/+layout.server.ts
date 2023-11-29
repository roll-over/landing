import db from "$lib/db";

export const load = async (event) => {
  const availableServices = [
    {
      type: "count",
      id: 1,
      title: "Добавить дополнительные кресла",
      price: 1000,
      description: "Добавить дополнительные кресла",
      freeCount: 2,
    },
    {
      type: "count",
      id: 2,
      title: "Дать доступ другим сотрудникам",
      price: 1000,
      description: "Дать доступ другим сотрудникам",
      freeCount: 1,
    },
  ];

  const companyId = event.params.companyId;

  const subscribtions = await db()
    .collection("subscription")
    .find(
      {
        companyId: companyId,
      },
      { projection: { _id: 0 } },
    )
    .toArray();

  return {
    availableServices: availableServices.map((item) => {
      return {
        ...item,
        count:
          subscribtions.find((service) => service.referenceId === item.id)?.count || item.freeCount,
      };
    }),
  };
};
