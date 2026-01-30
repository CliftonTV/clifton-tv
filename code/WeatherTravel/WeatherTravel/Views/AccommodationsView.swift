import SwiftUI

struct AccommodationsView: View {
    let city: String
    let country: String

    private var links: [ExternalLink] {
        LinkGenerator.accommodationLinks(city: city, country: country)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Header
                VStack(alignment: .leading, spacing: 4) {
                    Text("Stay in \(city)")
                        .font(.title)
                        .fontWeight(.bold)
                    Text("Find the perfect place to stay during your trip")
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }
                .padding(.bottom, 8)

                // Links
                ForEach(links) { link in
                    LinkCardView(link: link)
                }
            }
            .padding()
        }
        .background(Color(.systemGroupedBackground))
        .navigationTitle("Where to Stay")
        .navigationBarTitleDisplayMode(.inline)
    }
}

// MARK: - Link Card View

struct LinkCardView: View {
    let link: ExternalLink
    @Environment(\.openURL) private var openURL

    var body: some View {
        Button(action: { openURL(link.url) }) {
            HStack(spacing: 16) {
                // Icon
                ZStack {
                    RoundedRectangle(cornerRadius: 12)
                        .fill(link.brandColor.opacity(0.15))
                        .frame(width: 48, height: 48)

                    Image(systemName: link.iconName)
                        .font(.title3)
                        .foregroundColor(link.brandColor)
                }

                // Text
                VStack(alignment: .leading, spacing: 2) {
                    Text(link.title)
                        .font(.headline)
                        .foregroundColor(.primary)
                    Text(link.subtitle)
                        .font(.subheadline)
                        .foregroundColor(.secondary)
                }

                Spacer()

                // Chevron
                Image(systemName: "chevron.right")
                    .font(.subheadline)
                    .foregroundColor(.secondary)
            }
            .padding()
            .background(Color(.systemBackground))
            .cornerRadius(16)
            .overlay(
                RoundedRectangle(cornerRadius: 16)
                    .stroke(Color(.systemGray4), lineWidth: 1)
            )
        }
        .buttonStyle(PlainButtonStyle())
    }
}

#Preview {
    NavigationStack {
        AccommodationsView(city: "Paris", country: "France")
    }
}
