package com.shahabmillizai.palmistryai.data.api

import com.shahabmillizai.palmistryai.data.model.AnalyzePalmRequest
import com.shahabmillizai.palmistryai.data.model.ChatRequest
import com.shahabmillizai.palmistryai.data.model.ChatResponse
import com.shahabmillizai.palmistryai.data.model.PalmReport
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.POST
import java.util.concurrent.TimeUnit

interface PalmistryApiService {

    @POST("/api/analyze-palm")
    suspend fun analyzePalm(@Body request: AnalyzePalmRequest): PalmReport

    @POST("/api/chat")
    suspend fun chatWithMaster(@Body request: ChatRequest): ChatResponse

    @GET("/api/health")
    suspend fun checkHealth(): Map<String, Any>

    companion object {
        // Default API base url; user can also change in settings or point to backend server
        private const val DEFAULT_BASE_URL = "https://ais-dev-l4gnjdlptexrdy7ba5ldfz-71715359948.asia-northeast1.run.app/"

        fun create(baseUrl: String = DEFAULT_BASE_URL): PalmistryApiService {
            val logging = HttpLoggingInterceptor().apply {
                level = HttpLoggingInterceptor.Level.BODY
            }

            val client = OkHttpClient.Builder()
                .connectTimeout(60, TimeUnit.SECONDS)
                .readTimeout(60, TimeUnit.SECONDS)
                .writeTimeout(60, TimeUnit.SECONDS)
                .addInterceptor(logging)
                .build()

            return Retrofit.Builder()
                .baseUrl(baseUrl)
                .client(client)
                .addConverterFactory(GsonConverterFactory.create())
                .build()
                .create(PalmistryApiService::class.java)
        }
    }
}
