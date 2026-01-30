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

        do {
            async let originResult: CityData? = {
                if !originQuery.isEmpty {
                    return try await weatherService.searchCity(originQuery)
                }
                return nil
            }()

            async let destinationResult: CityData? = {
                if !destinationQuery.isEmpty {
                    return try await weatherService.searchCity(destinationQuery)
                }
                return nil
            }()

            let (origin, destination) = try await (originResult, destinationResult)

            if !originQuery.isEmpty && origin == nil {
                errorMessage = "Could not find location: \(originQuery)"
            } else if !destinationQuery.isEmpty && destination == nil {
                errorMessage = "Could not find location: \(destinationQuery)"
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
