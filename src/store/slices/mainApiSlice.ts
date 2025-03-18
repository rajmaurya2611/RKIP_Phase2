import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface TrainingData {
  id: number;
  query: string;
  answer: string;
  updated?: string;
}

interface UploadedFile {
  id: string;
  name: string;
  url: string;
}

interface Feedback {
  name: string;
  feedback: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const mainApiSlice = createApi({
  reducerPath: "mainApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: ["TrainingData", "Feedback"],

  endpoints: (builder) => ({
    // ✅ Fetch Training Data
    fetchTrainingData: builder.query<TrainingData[], void>({
      query: () => "/api/training-data",
      providesTags: ["TrainingData"],
    }),

    // ✅ Add Training Data
    addTrainingData: builder.mutation<TrainingData, { query: string; answer: string }>({
      query: (data) => ({
        url: "/api/training-data",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["TrainingData"],
    }),

    // ✅ Update Training Data
    updateTrainingData: builder.mutation<TrainingData, { id: number; query: string; answer: string }>({
      query: ({ id, query, answer }) => ({
        url: `/api/training-data/${id}`,
        method: "PUT",
        body: { query, answer },
      }),
      invalidatesTags: ["TrainingData"],
    }),

    // ✅ Delete Training Data
    deleteTrainingData: builder.mutation<void, number>({
      query: (id) => ({
        url: `/api/training-data/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["TrainingData"],
    }),

    // ✅ Upload File
    uploadFile: builder.mutation<{ message: string; file: UploadedFile }, FormData>({
      query: (formData) => ({
        url: "/upload",
        method: "POST",
        body: formData,
      }),
    }),

    // ✅ Submit Feedback (Auto-Refreshes Feedback List)
    submitFeedback: builder.mutation<{ message: string; recent_feedback: Feedback[] }, Feedback>({
      query: (data) => ({
        url: "/submit-feedback",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data,
      }),
      invalidatesTags: ["Feedback"], // Auto-refresh recent feedback
    }),

    // ✅ Fetch Recent Feedback (Auto-Refresh Enabled)
    fetchRecentFeedback: builder.query<{ recent_feedback: Feedback[] }, void>({
      query: () => "/get-recent-feedback",
      providesTags: (result) =>
        result
          ? [...result.recent_feedback.map(() => ({ type: "Feedback" as const }))] 
          : ["Feedback"],
    }),
  }),
});

export const {
  useFetchTrainingDataQuery,
  useAddTrainingDataMutation,
  useUpdateTrainingDataMutation,
  useDeleteTrainingDataMutation,
  useUploadFileMutation,
  useSubmitFeedbackMutation,
  useFetchRecentFeedbackQuery,
} = mainApiSlice;
