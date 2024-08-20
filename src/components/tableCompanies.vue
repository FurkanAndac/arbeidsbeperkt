<template>
  <q-page class="q-pa-md">
    <div class="container mx-auto p-4">
      <!-- Search Input, Location Filter, and Niveau Filter -->
      <div
        class="mb-4 flex flex-col md:flex-row md:items-center md:justify-between"
      >
        <div class="mb-4 md:mb-0">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search..."
            class="q-input rounded-md border border-gray-300 p-2"
          />
        </div>
        <div class="mb-4 md:mb-0">
          <select
            v-model="selectedLocation"
            class="q-select rounded-md border border-gray-300 p-2"
          >
            <option value="">Alle provincies</option>
            <option
              v-for="location in uniqueLocations"
              :key="location"
              :value="location"
            >
              {{ location }}
            </option>
          </select>
        </div>
        <div>
          <select
            v-model="selectedNiveau"
            class="q-select rounded-md border border-gray-300 p-2"
          >
            <option value="">Alle niveau's</option>
            <option value="Ongeschoold">Ongeschoold</option>
            <option value="MBO">MBO</option>
            <option value="HBO">HBO</option>
            <option value="WO">WO</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table
          class="min-w-full text-sm text-left text-gray-500 dark:text-gray-400"
        >
          <thead
            class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
          >
            <tr>
              <th scope="col" class="px-4 py-2">Bedrijf</th>
              <th scope="col" class="px-4 py-2">Omschrijving</th>
              <th scope="col" class="px-4 py-2">Telefoonnummer</th>
              <th scope="col" class="px-4 py-2">E-mail</th>
              <th scope="col" class="px-4 py-2">Provincie</th>
              <th scope="col" class="px-4 py-2">Niveau</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in paginatedItems"
              :key="item.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
              @click="openModal(item)"
            >
              <td class="px-4 py-2">{{ item.naamBedrijf }}</td>
              <td class="px-4 py-2">{{ truncateText(item.omschrijving) }}</td>
              <td class="px-4 py-2">
                <span :class="{ blur: !isLoggedIn }">
                  {{
                    isLoggedIn ? `📞 ${item.telefoonnummer}` : "📞 Verbergen"
                  }}
                </span>
              </td>
              <td class="px-4 py-2">
                <span :class="{ blur: !isLoggedIn }">
                  {{ isLoggedIn ? `✉️ ${item.email}` : "✉️ Verbergen" }}
                </span>
              </td>
              <td class="px-4 py-2">{{ item.provincie }}</td>
              <td class="px-4 py-2">{{ item.niveau }}</td>
              <td class="px-4 py-2 text-center">
                <button
                  @click.stop="toggleFavorite(item)"
                  class="focus:outline-none"
                >
                  <!-- SVG icon for favorites -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination Controls -->
      <div class="flex justify-center mt-4">
        <nav aria-label="Page navigation">
          <ul class="flex list-style-none">
            <li>
              <button
                @click="previousPage"
                :disabled="currentPage === 1"
                class="px-4 py-2 border rounded-l-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                &laquo;
              </button>
            </li>
            <li v-for="page in totalPages" :key="page">
              <button
                @click="setPage(page)"
                :class="[
                  'px-4 py-2 border',
                  {
                    'bg-blue-500 text-white': page === currentPage,
                    'bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600':
                      page !== currentPage,
                  },
                ]"
              >
                {{ page }}
              </button>
            </li>
            <li>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-4 py-2 border rounded-r-md bg-gray-200 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <!-- Modal -->
      <div
        v-if="showModal"
        class="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
      >
        <div
          class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md modal-content"
        >
          <h2 class="text-lg font-bold mb-4">Details</h2>
          <p><strong>Bedrijf:</strong> {{ selectedItem.naamBedrijf }}</p>
          <p><strong>Omschrijving:</strong> {{ selectedItem.omschrijving }}</p>
          <p>
            <strong>Telefoonnummer:</strong>
            <span v-if="isLoggedIn">
              <a
                :href="`tel:${selectedItem.telefoonnummer}`"
                class="text-blue-500 hover:underline"
                >{{ selectedItem.telefoonnummer }}</a
              >
            </span>
            <span v-else> 📞 Verborgen </span>
          </p>
          <p>
            <strong>E-mail:</strong>
            <span v-if="isLoggedIn">
              <a
                :href="`mailto:${selectedItem.email}`"
                class="text-blue-500 hover:underline"
                >{{ selectedItem.email }}</a
              >
            </span>
            <span v-else> ✉️ Verborgen </span>
          </p>
          <p><strong>Provincie:</strong> {{ selectedItem.provincie }}</p>
          <p><strong>Niveau:</strong> {{ selectedItem.niveau }}</p>
          <button
            @click="closeModal"
            class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { Clerk } from "@clerk/clerk-js";
import axios from "axios";
import { useStore } from "@nanostores/vue";
import { $authStore } from "@clerk/astro/client";

export default {
  setup() {
    const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
    const clerk = new Clerk(clerkPubKey);
    const isLoggedIn = ref(false);
    const user = ref(null);
    const favoriteItems = ref(new Set());

    onMounted(async () => {
      await clerk.load();
      const auth = useStore($authStore);
      user.value = clerk.user;
      isLoggedIn.value = !!clerk.user;

      const session = clerk.session;
      const idToken = await session.getToken();

      // if (isLoggedIn.value) {
      //   try {
      //     const response = await axios.get(
      //       `http://localhost:5000/api/favorites?userId=${idToken}`
      //     );
      //     favoriteItems.value = new Set(response.data.favorites);
      //   } catch (error) {
      //     console.error("Error fetching favorites:", error);
      //   }
      // }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/bedrijven-formulieren"
        );
        items.value = response.data;
      } catch (error) {
        console.error("Error fetching bedrijven formulieren:", error);
      }
    });

    const searchQuery = ref("");
    const selectedLocation = ref("");
    const selectedNiveau = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const items = ref([]);

    const toggleFavorite = async (item) => {
      try {
        if (!user.value) {
          throw new Error("User is not authenticated");
        }

        const session = clerk.session;
        const idToken = await session.getToken();

        await axios.post(
          "http://localhost:5000/api/toggle-favorite",
          { itemId: item.id },
          {
            headers: {
              Authorization: `Bearer ${idToken}`,
            },
          }
        );
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

    const uniqueLocations = computed(() => [
      ...new Set(items.value.map((item) => item.provincie)),
    ]);

    const truncateText = (text, maxLength = 50) => {
      if (!text) return "";
      return text.length > maxLength
        ? `${text.substring(0, maxLength)}...`
        : text;
    };

    const filteredItems = computed(() => {
      return items.value.filter((item) => {
        const matchesSearchQuery =
          item.naamBedrijf
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.omschrijving
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.telefoonnummer.includes(searchQuery.value) ||
          item.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
          item.provincie
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        const matchesLocation =
          selectedLocation.value === "" ||
          item.provincie === selectedLocation.value;

        const matchesNiveau =
          selectedNiveau.value === "" ||
          (item.niveau || []).includes(selectedNiveau.value);

        return matchesSearchQuery && matchesLocation && matchesNiveau;
      });
    });

    const totalPages = computed(() =>
      Math.ceil(filteredItems.value.length / itemsPerPage.value)
    );

    const paginatedItems = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredItems.value.slice(start, end);
    });

    const setPage = (page) => {
      currentPage.value = page;
    };

    const previousPage = () => {
      if (currentPage.value > 1) {
        currentPage.value--;
      }
    };

    const nextPage = () => {
      if (currentPage.value < totalPages.value) {
        currentPage.value++;
      }
    };

    const openModal = (item) => {
      selectedItem.value = item;
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
      selectedItem.value = null;
    };

    const showModal = ref(false);
    const selectedItem = ref(null);

    return {
      searchQuery,
      selectedLocation,
      selectedNiveau,
      currentPage,
      itemsPerPage,
      items,
      uniqueLocations,
      filteredItems,
      totalPages,
      paginatedItems,
      setPage,
      previousPage,
      nextPage,
      openModal,
      closeModal,
      showModal,
      selectedItem,
      isLoggedIn,
      truncateText,
      toggleFavorite,
    };
  },
};
</script>

<style scoped>
/* Modal styling */
.fixed {
  z-index: 1050;
}

.modal-content {
  max-height: 80vh;
  overflow-y: auto;
  padding: 1rem;
}

@media (max-width: 640px) {
  .modal-content {
    max-width: 90vw;
  }
}

.modal-content p {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px 16px;
  text-align: left;
}

thead th {
  background-color: #f3f4f6;
  color: #374151;
}

tr:hover {
  background-color: #f9fafb;
}

/* Blur effect */
.blur {
  filter: blur(5px);
}

@media (max-width: 640px) {
  .table-wrapper {
    display: block;
    overflow-x: auto;
  }

  table {
    border-spacing: 0;
    border-collapse: separate;
  }

  thead {
    display: none;
  }

  tr {
    display: block;
    margin-bottom: 0.625rem;
  }

  td {
    display: block;
    text-align: right;
    padding: 0.625rem;
    position: relative;
    border: none;
    border-bottom: 1px solid #e5e7eb;
  }

  td::before {
    content: attr(data-label);
    position: absolute;
    left: 0;
    width: 50%;
    padding-left: 0.625rem;
    font-weight: bold;
    color: #374151;
    white-space: nowrap;
  }
}
</style>
