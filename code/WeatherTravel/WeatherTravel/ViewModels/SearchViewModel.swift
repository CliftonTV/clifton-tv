import Foundation
import SwiftUI

@MainActor
class SearchViewModel: ObservableObject {
    @Published var originQuery: String = ""
    @Published var destinationQuery: String = ""
    @Published var originData: CityData?
    @Published var destinationData: CityData?
    @Published var isLoading: Bool = false
    @Published var errorMessage: String?

    private let weatherService = WeatherService.shared

    var canSearch: Bool {
        !originQuery.isEmpty || !destinationQuery.isEmpty
    }

    func search() async {
        guard canSearch else { return }

        isLoading = true
        errorMessage = nil
        originData = nil
        destinationData = nil

        // Capture values before async work to avoid actor isolation issues
        let originSearchQuery = originQuery
        let destinationSearchQuery = destinationQuery

        do {
            async let originResult: CityData? = originSearchQuery.isEmpty ? nil : weatherService.searchCity(originSearchQuery)
            async let destinationResult: CityData? = destinationSearchQuery.isEmpty ? nil : weatherService.searchCity(destinationSearchQuery)

            let (origin, destination) = try await (originResult, destinationResult)

            if !originSearchQuery.isEmpty && origin == nil {
                errorMessage = "Could not find location: \(originSearchQuery)"
            } else if !destinationSearchQuery.isEmpty && destination == nil {
                errorMessage = "Could not find location: \(destinationSearchQuery)"
            }

            originData = origin
            destinationData = destination
        } catch {
            errorMessage = "An error occurred: \(error.localizedDescription)"
        }

        isLoading = false
    }

    func clearResults() {
        originData = nil
        destinationData = nil
        errorMessage = nil
    }
}
