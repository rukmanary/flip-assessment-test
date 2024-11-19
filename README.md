This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

### Documentation

This documentation explains the flow and structure of the this App, including data handling, API integration, search and filter functionalities, and error management.

---

## **Application Flow**

### **1. Transaction List Page**

- Upon entering the Transaction List page, the `fetchAPI` function inside the `useEffect` hook is triggered.
- The `fetchAPI` function, derived from the custom `useApiService` hook, fetches data from the API and renders it inside a `FlatList`.
- Each list item is represented by a `TransactionItem` component containing the required transaction details.
- Clicking on a transaction navigates to the Transaction Detail page, passing the selected item data.

### **2. Transaction Detail Page**

- Displays detailed information about a transaction.
- Features a "Copy Transaction ID" functionality. Clicking it shows a **Snackbar** with the message: _"ID transaksi berhasil disalin"_ (Transaction ID copied).
- Includes "Back" and "Close" buttons to return to the Transaction List page.

### **3. Search and Filter Functionality**

- The Transaction List page includes a **Search** feature to search by:
  - Name
  - Bank
  - Nominal value
- Includes a **Filter** feature to sort data by criteria such as:
  - A-Z
  - Z-A
  - Newest
  - Oldest
- **Search and Filter** functionalities can be combined seamlessly.

---

## **Data Flow**

### **1. API Endpoint**

- Data is fetched from the endpoint: `https://recruitment-test.flip.id/frontend-test`.
- **Axios** is used for API calls, with an interceptor implemented for global error handling.

### **2. API Structure**

- API management is handled in the **`apiClient.ts`** file:
  - Manages Axios instance.
  - Base URL: `https://recruitment-test.flip.id`.
- Endpoints are stored in **`apiServices.ts`**:
  - Stores API endpoints.
  - Current endpoint: `/frontend-test` via `getTransactionList`.

---

## **API Success Flow**

### **Using `useApiService`**

- The `useApiService` hook is used for managing API calls, search, and filter functionalities.
- Return Type:
  ```typescript
  {
    data: T | null;
    rawData: T | null;
    loading: boolean;
    error: string | null;
    statusCode: number | null;
    fetchAPI: (...args: any[]) => Promise<void>;
    applyFilter: (filterFn?: (data: T) => T) => void;
    search: (
      query: string,
      searchFn: (item: T, query: string) => boolean,
    ) => void;
  }
  ```

## **Data Transformation**

1. **API Response Transformation**

   - The API response (object) is transformed into an array using `transformObjectToArray` for compatibility with `FlatList`.

2. **Model Mapping**

   - **`TransactionList`**: Maps the transformed data.
   - **`DetailTransaction`**: Formats and enriches transaction details with additional keys as required.

3. **State Management**
   - Processed data is stored in three states:
     - **`data`**: Filtered or search-applied data.
     - **`rawData`**: Original API response.
     - **`filteredData`**: Used for combined search and filter functionalities.

---

## **Search and Filter Combination**

- **Search**:

  - Filters data using the `search` function from `useApiService`, passing the param with query text and the `searchTransactions` helper.

- **Filter**:

  - Sort data using the `applyFilter` function from `useApiService`. It's param is a sorting function or empty (return default data without filter)
  - Applies sorting criteria using helper functions like:
    - `sortByAscendingName`
    - `sortByDescendingName`
    - `sortByNewestDate`
    - `sortByOldestDate`

- **Search and Filter Combination**:
  - Both functionalities are combined via the `filteredData` state in `useApiService`.

## **API Error Flow**

### **1. Error Handling with Axios Interceptor**

- A global `showErrorPopup` function is used to display error messages via a **Popup Error Message**.
- **Interceptor Workflow**:
  1. **For responses with errors**:
     - Extract the `status` and `message`.
     - Use a `switch` statement to handle common error codes (e.g., 401, 404, 500).
     - Call `showErrorPopup` with the `status` and error message.
  2. **For network errors**:
     - Call `showErrorPopup` with a `null` status and a network error message.

---

### **2. Integration in AppNavigator**

- The `setErrorPopupHandler` function registers the actual error handler in `AppNavigator`.
- **On error**:
  - The handler updates the local state:
    - `popupState.visible`
    - `popupState.message`
    - `popupState.status`
  - The **Popup Error Message** is displayed with the error message and status.
