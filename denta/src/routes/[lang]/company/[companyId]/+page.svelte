<script lang="ts">
  import { page } from "$app/stores";
  import AnotherCompanies from "$lib/components/AnotherCompanies.svelte";
  import CenteredPage from "$lib/components/CenteredPage.svelte";
  import ReviewsBlock from "$lib/components/ReviewsBlock.svelte";
  import type { Cabinet, Language } from "$lib/types/crm";
  import SvelteMarkdown from "svelte-markdown";
  import SvelteSeo from "svelte-seo";

  import { localisation } from "$lib/localisation/localisation";
  import type { LocalisationData } from "$lib/localisation/dynamic-localisation";
  $: l = localisation($page.params.lang);

  export let data: {
    cabinets: {
      address: Cabinet["address"];
    }[];
    countries: { value: string; label: string }[];
    cities: { value: string; label: string }[];
    country: { value: string; label: string };
    city: { value: string; label: string };
    lang: Language;
    infoCompany: {
      title: string;
      description: string;
      address: string;
      phone: string;
      href: string;
      views: number;
    };
    anotherCompanies: {
      _id: string;
      title: string;
      address: string;
      phone: string;
    }[];
    anotherInfoCompanies: {
      _id: string;
      title: string;
      address: string;
      phone: string;
    }[];
    reviews: {
      reviewId: string;
      name: string;
      avatar: string;
      rate: number;
      comment: string;
      views: number;
    }[];
    rate: number;
    session: {
      user: {
        name: string;
        email: string;
        image: string;
      };
    } | null;
    userReview: string;
    allUserReviews: string[];
    localisation: LocalisationData;
  };
</script>

<SvelteSeo
  title={`${data.infoCompany.title} ${l("в")} ${data.city.label}, ${data.country.label}`.slice(0, 60)}
  description={`${l("Стоматология")} ${data.infoCompany.title} ${l("в")} ${data.city.label}. ${
    data.infoCompany.description || ""
  }`?.slice(0, 150)}
  jsonLd={{
    "@context": "https://schema.org",
    "@type": "Dentist",
    name: `${data.infoCompany.title}`,
    description: `${data.infoCompany.description}`,
    telephone: `${data.infoCompany.phone}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: `${data.city.label}`,
      addressCountry: `${data.country.label}`,
      streetAddress: `${data.infoCompany.address}`,
    },
    paymentAccepted: "Cash, Credit Card",
    priceRange: "$$",
  }}
></SvelteSeo>

<CenteredPage>
  <h1>{data.infoCompany.title}</h1>
  <div class="card variant-glass-primary">
    <header class="card-header">
      <h2>{l("Информация о стоматологии")}</h2>
    </header>
    <div class="p-4">
      {#if data.infoCompany.description}
        <section>
          <h3>{l("Описание")}:</h3>
          <SvelteMarkdown source={data.infoCompany.description} />
        </section>
      {/if}
    </div>
    <footer class="card-footer">
      <address>
        <p>{l("Адрес")}: {data.infoCompany.address}, {data.city.label}, {data.country.label}</p>
        <p>
          {l("Телефон")}:
          <a href={`tel:${data.infoCompany.phone.replaceAll(" ", "")}`}>{data.infoCompany.phone}</a>
        </p>
        <a href={data.infoCompany.href} target="_blank" rel="noopener noreferrer"
          >{l("Открыть на google карте")}</a
        >
      </address>

      <p class="p-5 text-gray-600">
        {data.localisation["Просмотров"]}: {data.infoCompany.views || 0}
      </p>
    </footer>
  </div>

  <ReviewsBlock
    reviews={data.reviews}
    rating={data.rating}
    session={data.session}
    rootId={`company-${$page.params.companyId}`}
    userReview={data.userReview}
    allUserReviews={data.allUserReviews}
  />

  <AnotherCompanies
    data={{
      anotherCompanies: data.anotherCompanies,
      anotherInfoCompanies: data.anotherInfoCompanies,
      country: data.country,
      city: data.city,
    }}
  />
</CenteredPage>
