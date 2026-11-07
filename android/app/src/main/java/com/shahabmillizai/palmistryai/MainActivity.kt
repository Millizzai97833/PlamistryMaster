package com.shahabmillizai.palmistryai

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.shahabmillizai.palmistryai.data.model.PalmReport
import com.shahabmillizai.palmistryai.ui.theme.*

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            PalmistryAITheme {
                PalmistryAppMain()
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PalmistryAppMain() {
    var currentTab by remember { mutableStateOf("home") }
    var selectedHand by remember { mutableStateOf("right") }
    var currentReport by remember { mutableStateOf<PalmReport?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = {
                    Column {
                        Text(
                            text = "Palmistry AI",
                            style = MaterialTheme.typography.titleMedium,
                            color = GoldPrimary
                        )
                        Text(
                            text = "Future & Palm Reading · Shahab Millizai",
                            style = MaterialTheme.typography.bodySmall,
                            color = SlateTextSecondary
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = MysticDark
                ),
                actions = {
                    IconButton(onClick = { currentTab = "settings" }) {
                        Icon(
                            imageVector = Icons.Default.Settings,
                            contentDescription = "Settings",
                            tint = GoldPrimary
                        )
                    }
                }
            )
        },
        bottomBar = {
            NavigationBar(
                containerColor = MysticDark,
                tonalElevation = 8.dp
            ) {
                NavigationBarItem(
                    selected = currentTab == "home",
                    onClick = { currentTab = "home" },
                    icon = { Icon(Icons.Default.Home, contentDescription = "Home") },
                    label = { Text("Home") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.Black,
                        selectedTextColor = GoldPrimary,
                        indicatorColor = GoldPrimary
                    )
                )
                NavigationBarItem(
                    selected = currentTab == "upload",
                    onClick = { currentTab = "upload" },
                    icon = { Icon(Icons.Default.CameraAlt, contentDescription = "Scan") },
                    label = { Text("Scan") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.Black,
                        selectedTextColor = GoldPrimary,
                        indicatorColor = GoldPrimary
                    )
                )
                NavigationBarItem(
                    selected = currentTab == "lines",
                    onClick = { currentTab = "lines" },
                    icon = { Icon(Icons.Default.AutoAwesome, contentDescription = "Lines") },
                    label = { Text("Lines") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.Black,
                        selectedTextColor = GoldPrimary,
                        indicatorColor = GoldPrimary
                    )
                )
                NavigationBarItem(
                    selected = currentTab == "chat",
                    onClick = { currentTab = "chat" },
                    icon = { Icon(Icons.Default.Chat, contentDescription = "Master") },
                    label = { Text("Master") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.Black,
                        selectedTextColor = GoldPrimary,
                        indicatorColor = GoldPrimary
                    )
                )
                NavigationBarItem(
                    selected = currentTab == "history",
                    onClick = { currentTab = "history" },
                    icon = { Icon(Icons.Default.History, contentDescription = "History") },
                    label = { Text("History") },
                    colors = NavigationBarItemDefaults.colors(
                        selectedIconColor = Color.Black,
                        selectedTextColor = GoldPrimary,
                        indicatorColor = GoldPrimary
                    )
                )
            }
        }
    ) { innerPadding ->
        Box(
            modifier = Modifier
                .fillMaxSize()
                .background(MysticDark)
                .padding(innerPadding)
        ) {
            when (currentTab) {
                "home" -> HomeScreenCompose(
                    onScanClick = { currentTab = "upload" },
                    onLinesClick = { currentTab = "lines" }
                )
                "upload" -> UploadScreenCompose(
                    selectedHand = selectedHand,
                    onHandChange = { selectedHand = it },
                    onReportReady = { report ->
                        currentReport = report
                        currentTab = "report"
                    }
                )
                "report" -> ReportScreenCompose(
                    report = currentReport,
                    onInspectLines = { currentTab = "lines" },
                    onAskMaster = { currentTab = "chat" }
                )
                "lines" -> LinesScreenCompose(report = currentReport)
                "chat" -> ChatScreenCompose(currentReport = currentReport)
                "history" -> HistoryScreenCompose(
                    onSelect = { report ->
                        currentReport = report
                        currentTab = "report"
                    }
                )
                "settings" -> SettingsScreenCompose()
            }
        }
    }
}

@Composable
fun HomeScreenCompose(onScanClick: () -> Unit, onLinesClick: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Card(
            colors = CardDefaults.cardColors(containerColor = MysticCardBg),
            modifier = Modifier.fillMaxWidth()
        ) {
            Column(modifier = Modifier.padding(20.dp)) {
                Text(
                    text = "Welcome to Palmistry AI",
                    style = MaterialTheme.typography.headlineSmall,
                    color = GoldPrimary
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = "Discover deep insights from flexion creases, mounts, and sacred geometry powered by advanced AI vision.",
                    style = MaterialTheme.typography.bodyMedium,
                    color = SlateTextPrimary
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = onScanClick,
                    colors = ButtonDefaults.buttonColors(containerColor = GoldPrimary)
                ) {
                    Text("Scan Palm Now", color = Color.Black)
                }
            }
        }
    }
}

@Composable
fun UploadScreenCompose(
    selectedHand: String,
    onHandChange: (String) -> Unit,
    onReportReady: (PalmReport) -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Palm Image Upload & Camera", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Text("Capture or choose a photograph of your palm. The AI inspects 11 lines and 7 planetary mounts.", color = SlateTextSecondary)
    }
}

@Composable
fun ReportScreenCompose(
    report: PalmReport?,
    onInspectLines: () -> Unit,
    onAskMaster: () -> Unit
) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Comprehensive Reading", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Spacer(modifier = Modifier.height(8.dp))
        Text(report?.overallAnalysis ?: "No reading loaded yet. Please scan a palm.", color = SlateTextPrimary)
    }
}

@Composable
fun LinesScreenCompose(report: PalmReport?) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("11-Line Micro Crease Analysis", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Heart Line, Head Line, Life Line, Fate Line, Sun Line, Mercury Line, Marriage Lines, Health Line, Travel Lines, Intuition Line, Bracelet Lines.", color = SlateTextSecondary)
    }
}

@Composable
fun ChatScreenCompose(currentReport: PalmReport?) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Palmistry Master AI", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Ask unlimited questions about palmistry in Urdu, Pashto, Arabic, Hindi, Korean, Chinese, or English.", color = SlateTextSecondary)
    }
}

@Composable
fun HistoryScreenCompose(onSelect: (PalmReport) -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Saved Readings Archive", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Revisit past readings or compare left and right hands side by side.", color = SlateTextSecondary)
    }
}

@Composable
fun SettingsScreenCompose() {
    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp)
    ) {
        Text("Settings & About", style = MaterialTheme.typography.titleLarge, color = GoldPrimary)
        Spacer(modifier = Modifier.height(8.dp))
        Text("Developer: Shahab Millizai", color = SlateTextPrimary)
        Text("Package: com.shahabmillizai.palmistryai", color = SlateTextSecondary)
        Text("Platform: Android Jetpack Compose / Material 3", color = SlateTextSecondary)
    }
}
