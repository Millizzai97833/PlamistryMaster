package com.shahabmillizai.palmistryai.data.model

import com.google.gson.annotations.SerializedName

data class PalmLineDetail(
    @SerializedName("id") val id: String,
    @SerializedName("name") val name: String,
    @SerializedName("location") val location: String,
    @SerializedName("visualDescription") val visualDescription: String,
    @SerializedName("shapeStructure") val shapeStructure: String,
    @SerializedName("lengthDepth") val lengthDepth: String,
    @SerializedName("specialMarkings") val specialMarkings: List<String> = emptyList(),
    @SerializedName("traditionalMeaning") val traditionalMeaning: String,
    @SerializedName("personalityInterpretation") val personalityInterpretation: String,
    @SerializedName("relationshipInterpretation") val relationshipInterpretation: String? = null,
    @SerializedName("careerInterpretation") val careerInterpretation: String? = null,
    @SerializedName("symbolicFutureThemes") val symbolicFutureThemes: String,
    @SerializedName("positiveAspects") val positiveAspects: List<String> = emptyList(),
    @SerializedName("challengesAndCautions") val challengesAndCautions: List<String> = emptyList(),
    @SerializedName("confidence") val confidence: Int = 90
)

data class MountObservation(
    @SerializedName("name") val name: String,
    @SerializedName("planet") val planet: String,
    @SerializedName("prominence") val prominence: String,
    @SerializedName("interpretation") val interpretation: String
)

data class FutureTimeline(
    @SerializedName("next3Months") val next3Months: String,
    @SerializedName("next6Months") val next6Months: String,
    @SerializedName("next12Months") val next12Months: String,
    @SerializedName("next3Years") val next3Years: String,
    @SerializedName("longTermDirection") val longTermDirection: String
)

data class FutureThemes(
    @SerializedName("loveAndRelationships") val loveAndRelationships: String,
    @SerializedName("marriageAndPartnerships") val marriageAndPartnerships: String,
    @SerializedName("careerAndProfessional") val careerAndProfessional: String,
    @SerializedName("moneyAndFinancial") val moneyAndFinancial: String,
    @SerializedName("businessOpportunities") val businessOpportunities: String,
    @SerializedName("educationAndLearning") val educationAndLearning: String,
    @SerializedName("personalGrowth") val personalGrowth: String,
    @SerializedName("travelAndRelocation") val travelAndRelocation: String,
    @SerializedName("familyAndSocial") val familyAndSocial: String,
    @SerializedName("importantTransitions") val importantTransitions: String
)

data class FutureReadingContainer(
    @SerializedName("timeline") val timeline: FutureTimeline,
    @SerializedName("themes") val themes: FutureThemes
)

data class LoveReading(
    @SerializedName("summary") val summary: String,
    @SerializedName("attachmentStyle") val attachmentStyle: String,
    @SerializedName("idealPartnerQualities") val idealPartnerQualities: String,
    @SerializedName("relationshipMilestones") val relationshipMilestones: String
)

data class CareerReading(
    @SerializedName("summary") val summary: String,
    @SerializedName("wealthTendencies") val wealthTendencies: String,
    @SerializedName("optimalCareerPaths") val optimalCareerPaths: List<String> = emptyList(),
    @SerializedName("businessInstinct") val businessInstinct: String,
    @SerializedName("financialDiscipline") val financialDiscipline: String
)

data class PersonalityProfile(
    @SerializedName("archetype") val archetype: String,
    @SerializedName("coreStrengths") val coreStrengths: List<String> = emptyList(),
    @SerializedName("shadowTraitsOrChallenges") val shadowTraitsOrChallenges: List<String> = emptyList(),
    @SerializedName("intuitionLevel") val intuitionLevel: String,
    @SerializedName("lifePhilosophy") val lifePhilosophy: String
)

data class ImageQuality(
    @SerializedName("isClear") val isClear: Boolean = true,
    @SerializedName("clarityScore") val clarityScore: Int = 90,
    @SerializedName("message") val message: String = "",
    @SerializedName("suggestions") val suggestions: String? = null
)

data class HandOrientation(
    @SerializedName("hand") val hand: String = "right",
    @SerializedName("palmType") val palmType: String = "Air",
    @SerializedName("palmTypeDescription") val palmTypeDescription: String = "",
    @SerializedName("fingerObservations") val fingerObservations: String = ""
)

data class PalmReport(
    @SerializedName("id") val id: String,
    @SerializedName("timestamp") val timestamp: Long = System.currentTimeMillis(),
    @SerializedName("imageUrl") val imageUrl: String,
    @SerializedName("handType") val handType: String,
    @SerializedName("imageQuality") val imageQuality: ImageQuality? = null,
    @SerializedName("orientation") val orientation: HandOrientation? = null,
    @SerializedName("overallAnalysis") val overallAnalysis: String,
    @SerializedName("mounts") val mounts: List<MountObservation> = emptyList(),
    @SerializedName("lines") val lines: List<PalmLineDetail> = emptyList(),
    @SerializedName("futureReading") val futureReading: FutureReadingContainer? = null,
    @SerializedName("loveAndMarriage") val loveAndMarriage: LoveReading? = null,
    @SerializedName("careerAndMoney") val careerAndMoney: CareerReading? = null,
    @SerializedName("personalityProfile") val personalityProfile: PersonalityProfile? = null,
    @SerializedName("finalSummary") val finalSummary: String = "",
    @SerializedName("disclaimer") val disclaimer: String = ""
)

data class AnalyzePalmRequest(
    @SerializedName("imageBase64") val imageBase64: String,
    @SerializedName("mimeType") val mimeType: String = "image/jpeg",
    @SerializedName("handType") val handType: String = "right",
    @SerializedName("language") val language: String = "en"
)

data class ChatMessageItem(
    @SerializedName("role") val role: String,
    @SerializedName("text") val text: String
)

data class ChatRequest(
    @SerializedName("message") val message: String,
    @SerializedName("history") val history: List<ChatMessageItem> = emptyList(),
    @SerializedName("currentReading") val currentReading: PalmReport? = null,
    @SerializedName("language") val language: String = "en"
)

data class ChatResponse(
    @SerializedName("role") val role: String,
    @SerializedName("text") val text: String,
    @SerializedName("suggestedFollowUps") val suggestedFollowUps: List<String> = emptyList(),
    @SerializedName("timestamp") val timestamp: Long
)
