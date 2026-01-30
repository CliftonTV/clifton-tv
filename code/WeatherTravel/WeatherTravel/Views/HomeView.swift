import SwiftUI

struct HomeView: View {
    @StateObject private var viewModel = SearchViewModel()
    @State private var showResults = false

    var body: some View {
        ScrollView {
            VStack(spacing: 0) {
                // Hero Section
                heroSection

                // Search Form
                searchForm

                // Feature Cards
                featureCards
            }
        }
        .background(Color(.systemBackground))
        .navigationTitle("Weather & Travel")
        .navigationBarTitleDisplayMode(.inline)
        .navigationDestination(isPresented: $showResults) {
            WeatherResultsView(viewModel: viewModel)
        }
    }

    // MARK: - Hero Section

    private var heroSection: some View {
        VStack(spacing: 16) {
            Image(systemName: "airplane")
                .font(.system(size: 40))
                .foregroundColor(.accentColor)

            Text("Weather & Travel Planner")
                .font(.title)
                .fontWeight(.bold)
                .multilineTextAlignment(.center)

            Text("Search by city name, zip code, or airport code to compare weather and find the perfect accommodations.")
                .font(.body)
                .foregroundColor(.secondary)
                .multilineTextAlignment(.center)
                .padding(.horizontal)
        }
        .padding(.vertical, 32)
        .frame(maxWidth: .infinity)
        .background(Color.accentColor.opacity(0.1))
    }

    // MARK: - Search Form

    private var searchForm: some View {
        VStack(spacing: 16) {
            // Origin Input
            HStack {
                Image(systemName: "location.fill")
                    .foregroundColor(.secondary)
                    .frame(width: 24)
                TextField("Origin (city, zip, or airport)", text: $viewModel.originQuery)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)

            // Destination Input
            HStack {
                Image(systemName: "airplane")
                    .foregroundColor(.secondary)
                    .frame(width: 24)
                TextField("Destination (city, zip, or airport)", text: $viewModel.destinationQuery)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
            }
            .padding()
            .background(Color(.systemGray6))
            .cornerRadius(12)

            // Search Button
            Button(action: performSearch) {
                HStack {
                    if viewModel.isLoading {
                        ProgressView()
                            .progressViewStyle(CircularProgressViewStyle(tint: .white))
                    } else {
                        Image(systemName: "magnifyingglass")
                    }
                    Text(viewModel.isLoading ? "Searching..." : "Search Weather & Travel Info")
                        .fontWeight(.semibold)
                }
                .frame(maxWidth: .infinity)
                .padding()
                .background(viewModel.canSearch ? Color.accentColor : Color.gray)
                .foregroundColor(.white)
                .cornerRadius(12)
            }
            .disabled(!viewModel.canSearch || viewModel.isLoading)

            // Hint Text
            Text("Try: \"NYC\", \"90210\", \"LAX\", \"London\", \"Paris CDG\"")
                .font(.caption)
                .foregroundColor(.secondary)

            // Error Message
            if let error = viewModel.errorMessage {
                Text(error)
                    .font(.callout)
                    .foregroundColor(.red)
                    .padding()
                    .frame(maxWidth: .infinity)
                    .background(Color.red.opacity(0.1))
                    .cornerRadius(8)
            }
        }
        .padding()
    }

    // MARK: - Feature Cards

    private var featureCards: some View {
        VStack(spacing: 12) {
            FeatureCard(
                emoji: "🌍",
                title: "Search Flexibly",
                description: "Use city names, zip codes, or airport codes like LAX, JFK, or CDG"
            )

            FeatureCard(
                emoji: "🌤️",
                title: "Compare Weather",
                description: "See current conditions and 7-day forecasts for both locations"
            )

            FeatureCard(
                emoji: "🏨",
                title: "Find Stays & Activities",
                description: "Direct links to Airbnb, hotels, restaurants, and attractions"
            )
        }
        .padding()
    }

    // MARK: - Actions

    private func performSearch() {
        Task {
            await viewModel.search()
            if viewModel.originData != nil || viewModel.destinationData != nil {
                showResults = true
            }
        }
    }
}

// MARK: - Feature Card

struct FeatureCard: View {
    let emoji: String
    let title: String
    let description: String

    var body: some View {
        HStack(alignment: .top, spacing: 12) {
            Text(emoji)
                .font(.title2)

            VStack(alignment: .leading, spacing: 4) {
                Text(title)
                    .font(.headline)
                Text(description)
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }

            Spacer()
        }
        .padding()
        .background(Color(.systemGray6))
        .cornerRadius(12)
    }
}

#Preview {
    NavigationStack {
        HomeView()
    }
}
