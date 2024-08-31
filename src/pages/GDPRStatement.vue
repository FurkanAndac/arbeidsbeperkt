<template>
  <div class="gdpr-statement">
    <h1>GDPR & Privacy Beleid</h1>
    <p>
      We nemen jouw privacy serieus en streven ernaar je persoonlijke gegevens
      te beschermen. Dit document legt uit hoe we jouw gegevens verzamelen,
      gebruiken en beveiligen in overeenstemming met de GDPR.
    </p>

    <h2>Welke gegevens verzamelen we?</h2>
    <p>
      We verzamelen alleen de gegevens die nodig zijn voor het leveren van onze
      diensten, zoals je naam, e-mailadres, en eventueel betalingsinformatie.
    </p>

    <h2>Hoe gebruiken we jouw gegevens?</h2>
    <p>
      Jouw gegevens worden gebruikt om onze diensten te leveren, je ervaring te
      personaliseren, en je te informeren over updates of promoties.
    </p>

    <h2>Jouw rechten</h2>
    <p>
      Je hebt het recht om je gegevens in te zien, te corrigeren, te laten
      verwijderen, en bezwaar te maken tegen de verwerking ervan. Neem contact
      met ons op als je een van deze rechten wilt uitoefenen.
    </p>

    <h2>Cookiebeleid</h2>
    <p>
      We gebruiken cookies om je ervaring op onze website te verbeteren. Voor
      meer informatie, zie ons
      <router-link :to="{ name: 'CookiePolicy' }">cookiebeleid</router-link>.
    </p>
  </div>
</template>

<script setup></script>

<style scoped>
.gdpr-statement {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.gdpr-statement h1,
.gdpr-statement h2 {
  color: #333;
}

.gdpr-statement p {
  color: #555;
  line-height: 1.6;
}
</style>
