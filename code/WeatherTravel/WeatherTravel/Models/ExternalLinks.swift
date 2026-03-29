import Foundation
import SwiftUI

struct ExternalLink: Identifiable {
    let id = UUID()
    let title: String
    let subtitle: String
    let url: URL
    let iconName: String
    let brandColor: Color
}

struct LinkGenerator {
    static func accommodationLinks(city: String, country: String) -> [ExternalLink] {
        let encodedLocation = "\(city), \(country)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        let encodedCity = city.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""

        return [
            ExternalLink(
                title: "Airbnb",
                subtitle: "Unique homes & experiences",
                url: URL(string: "https://www.airbnb.com/s/\(encodedLocation)/homes")!,
                iconName: "house.fill",
                brandColor: Color(hex: "FF5A5F")
            ),
            ExternalLink(
                title: "Booking.com",
                subtitle: "Hotels & apartments",
                url: URL(string: "https://www.booking.com/searchresults.html?ss=\(encodedLocation)")!,
                iconName: "bed.double.fill",
                brandColor: Color(hex: "003580")
            ),
            ExternalLink(
                title: "Hotels.com",
                subtitle: "Earn free nights",
                url: URL(string: "https://www.hotels.com/search.do?destination=\(encodedLocation)")!,
                iconName: "building.fill",
                brandColor: Color(hex: "D32F2F")
            ),
            ExternalLink(
                title: "VRBO",
                subtitle: "Vacation rentals",
                url: URL(string: "https://www.vrbo.com/search?destination=\(encodedLocation)")!,
                iconName: "house.lodge.fill",
                brandColor: Color(hex: "0077CC")
            ),
            ExternalLink(
                title: "Expedia",
                subtitle: "Bundle & save",
                url: URL(string: "https://www.expedia.com/Hotel-Search?destination=\(encodedLocation)")!,
                iconName: "globe",
                brandColor: Color(hex: "CC9900")
            ),
            ExternalLink(
                title: "TripAdvisor",
                subtitle: "Reviews & deals",
                url: URL(string: "https://www.tripadvisor.com/Search?q=\(encodedCity)")!,
                iconName: "star.fill",
                brandColor: Color(hex: "00AF87")
            ),
        ]
    }

    static func thingsToDoLinks(city: String, country: String) -> [ExternalLink] {
        let encodedLocation = "\(city), \(country)".addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""
        let encodedCity = city.addingPercentEncoding(withAllowedCharacters: .urlQueryAllowed) ?? ""

        return [
            ExternalLink(
                title: "Yelp",
                subtitle: "Restaurants & services",
                url: URL(string: "https://www.yelp.com/search?find_loc=\(encodedLocation)")!,
                iconName: "fork.knife",
                brandColor: Color(hex: "FF1A1A")
            ),
            ExternalLink(
                title: "Google Maps",
                subtitle: "Explore the area",
                url: URL(string: "https://www.google.com/maps/search/things+to+do+in+\(encodedLocation)")!,
                iconName: "map.fill",
                brandColor: Color(hex: "4285F4")
            ),
            ExternalLink(
                title: "Viator",
                subtitle: "Tours & activities",
                url: URL(string: "https://www.viator.com/searchResults/all?text=\(encodedLocation)")!,
                iconName: "camera.fill",
                brandColor: Color(hex: "3A3A3A")
            ),
            ExternalLink(
                title: "GetYourGuide",
                subtitle: "Experiences & tickets",
                url: URL(string: "https://www.getyourguide.com/s?q=\(encodedLocation)")!,
                iconName: "ticket.fill",
                brandColor: Color(hex: "FF5533")
            ),
            ExternalLink(
                title: "TripAdvisor Dining",
                subtitle: "Top restaurants",
                url: URL(string: "https://www.tripadvisor.com/Search?q=\(encodedCity)+restaurants")!,
                iconName: "cup.and.saucer.fill",
                brandColor: Color(hex: "00AF87")
            ),
            ExternalLink(
                title: "TripAdvisor Attractions",
                subtitle: "Things to see",
                url: URL(string: "https://www.tripadvisor.com/Search?q=\(encodedCity)+attractions")!,
                iconName: "binoculars.fill",
                brandColor: Color(hex: "00AF87")
            ),
        ]
    }
}

// Color extension for hex colors
extension Color {
    init(hex: String) {
        let hex = hex.trimmingCharacters(in: CharacterSet.alphanumerics.inverted)
        var int: UInt64 = 0
        Scanner(string: hex).scanHexInt64(&int)
        let a, r, g, b: UInt64
        switch hex.count {
        case 3: // RGB (12-bit)
            (a, r, g, b) = (255, (int >> 8) * 17, (int >> 4 & 0xF) * 17, (int & 0xF) * 17)
        case 6: // RGB (24-bit)
            (a, r, g, b) = (255, int >> 16, int >> 8 & 0xFF, int & 0xFF)
        case 8: // ARGB (32-bit)
            (a, r, g, b) = (int >> 24, int >> 16 & 0xFF, int >> 8 & 0xFF, int & 0xFF)
        default:
            (a, r, g, b) = (1, 1, 1, 0)
        }

        self.init(
            .sRGB,
            red: Double(r) / 255,
            green: Double(g) / 255,
            blue: Double(b) / 255,
            opacity: Double(a) / 255
        )
    }
}
