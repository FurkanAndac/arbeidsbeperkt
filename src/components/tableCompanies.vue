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
              <td class="px-4 py-2">{{ item.formData.naamBedrijf }}</td>
              <td class="px-4 py-2">
                {{ truncateText(item.formData.omschrijving) }}
              </td>
              <td class="px-4 py-2">
                <span :class="{ blur: !isLoggedIn }">
                  {{
                    isLoggedIn
                      ? `📞 ${item.formData.telefoonnummer}`
                      : "📞 Verbergen"
                  }}
                </span>
              </td>
              <td class="px-4 py-2">
                <span :class="{ blur: !isLoggedIn }">
                  {{
                    isLoggedIn ? `✉️ ${item.formData.email}` : "✉️ Verbergen"
                  }}
                </span>
              </td>
              <td class="px-4 py-2">{{ item.formData.provincie }}</td>
              <td class="px-4 py-2">{{ item.formData.niveau }}</td>
              <td class="px-4 py-2 text-center">
                <button
                  @click.stop="toggleFavorite(item)"
                  class="focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    :class="{
                      'text-yellow-500': favoriteItems.has(item._id),
                      'text-gray-500': !favoriteItems.has(item._id),
                    }"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
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
          <p>
            <strong>Bedrijf:</strong> {{ selectedItem.formData.naamBedrijf }}
          </p>
          <p>
            <strong>Omschrijving:</strong>
            {{ selectedItem.formData.omschrijving }}
          </p>
          <p>
            <strong>Telefoonnummer:</strong>
            <span v-if="isLoggedIn">
              <a
                :href="`tel:${selectedItem.formData.telefoonnummer}`"
                class="text-blue-500 hover:underline"
                >{{ selectedItem.formData.telefoonnummer }}</a
              >
            </span>
            <span v-else>
              📞
              <router-link
                to="/authentication/login"
                class="text-blue-500 hover:underline"
                >Login om te zien</router-link
              >
            </span>
          </p>
          <p>
            <strong>E-mail:</strong>
            <span v-if="isLoggedIn">
              <a
                :href="`mailto:${selectedItem.formData.email}`"
                class="text-blue-500 hover:underline"
                >{{ selectedItem.formData.email }}</a
              >
            </span>
            <span v-else>
              📞
              <router-link
                to="/authentication/login"
                class="text-blue-500 hover:underline"
                >Login om te zien</router-link
              >
            </span>
          </p>
          <p>
            <strong>Provincie:</strong> {{ selectedItem.formData.provincie }}
          </p>
          <p><strong>Niveau:</strong> {{ selectedItem.formData.niveau }}</p>
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
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../boot/firebase"; // Ensure you have this file with your Firebase configuration

// Initialize Firebase
app;

export default {
  setup() {
    const auth = getAuth();
    const isLoggedIn = ref(false);
    const user = ref(null);
    const favoriteItems = ref(new Set());

    const searchQuery = ref("");
    const selectedLocation = ref("");
    const selectedNiveau = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(20);
    const items = ref([]);
    const showModal = ref(false);
    const selectedItem = ref(null);

    const fetchFavorites = async () => {
      if (!user.value) return;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/favorites?userId=${
            user.value.uid
          }`
        );

        // Check if response.data is null or not an object
        if (!response.data || typeof response.data !== "object") {
          console.warn("No favorites data available or invalid data format.");
          return; // Skip further processing
        }

        // Check if response.data.entryIds exists and is an array
        if (!Array.isArray(response.data.entryIds)) {
          console.warn("Invalid favorites data format.");
          return; // Skip further processing
        }

        // Update favoriteItems if the data is valid
        favoriteItems.value = new Set(response.data.entryIds.map((fav) => fav));
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    onMounted(async () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          user.value = currentUser;
          isLoggedIn.value = true;
          await fetchFavorites();
        } else {
          isLoggedIn.value = false;
        }

        try {
          const response = await axios.get(
            import.meta.env.VITE_BACKEND_BASE_URL + "/api/bedrijven-formulieren"
          );
          items.value = response.data;
        } catch (error) {
          console.error("Error fetching bedrijven formulieren:", error);
        }
      });
    });

    const toggleFavorite = async (item) => {
      try {
        if (!isLoggedIn.value) {
          throw new Error("User is not authenticated");
        }
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_BASE_URL + "/api/toggle-favorite",
          { userId: user.value.uid, entryId: item._id }
        );

        if (response.data.message === "Favorite added") {
          favoriteItems.value.add(item._id);
        } else if (response.data.message === "Favorite removed") {
          favoriteItems.value.delete(item._id);
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    };

    const uniqueLocations = computed(() => [
      ...new Set(items.value.map((item) => item.formData.provincie)),
    ]);

    const truncateText = (text, maxLength = 50) => {
      if (!text) return "";
      return text.length > maxLength
        ? `${text.substring(0, maxLength)}...`
        : text;
    };

    const sortedItems = computed(() => {
      const favoriteArray = items.value.filter((item) =>
        favoriteItems.value.has(item._id)
      );
      const nonFavoriteArray = items.value.filter(
        (item) => !favoriteItems.value.has(item._id)
      );
      return [...favoriteArray, ...nonFavoriteArray];
    });

    const filteredItems = computed(() => {
      return sortedItems.value.filter((item) => {
        const matchesSearchQuery =
          item.formData.naamBedrijf
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.formData.omschrijving
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.formData.telefoonnummer.includes(searchQuery.value) ||
          item.formData.email
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase()) ||
          item.formData.provincie
            .toLowerCase()
            .includes(searchQuery.value.toLowerCase());

        const matchesLocation =
          selectedLocation.value === "" ||
          item.formData.provincie === selectedLocation.value;

        const matchesNiveau =
          selectedNiveau.value === "" ||
          (item.formData.niveau || []).includes(selectedNiveau.value);

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
      favoriteItems,
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
