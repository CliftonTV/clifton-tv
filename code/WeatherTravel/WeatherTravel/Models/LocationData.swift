import Foundation

struct LocationData: Identifiable, Codable {
    var id: String { "\(latitude),\(longitude)" }
    let name: String
    let country: String
    let latitude: Double
    let longitude: Double
    let timezone: String

    var displayName: String {
        "\(name), \(country)"
    }
}

struct GeocodingResponse: Codable {
    let results: [GeocodingResult]?
}

struct GeocodingResult: Codable {
    let name: String
    let country: String
    let latitude: Double
    let longitude: Double
    let timezone: String
}
