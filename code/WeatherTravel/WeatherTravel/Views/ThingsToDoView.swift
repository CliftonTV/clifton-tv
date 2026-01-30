import SwiftUI

struct ThingsToDoView: View {
    let city: String
    let country: String

    private var links: [ExternalLink] {
        LinkGenerator.thingsToDoLinks(city: city, country: country)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                // Header
                VStack(alignment: .leading, spacing: 4) {
                    Text("Things to Do in \(city)")
                        .font(.title)
                        .fontWeight(.bold)
                    Text("Discover restaurants, attractions, and experiences")
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
        .navigationTitle("Things to Do")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    NavigationStack {
        ThingsToDoView(city: "Paris", country: "France")
    }
}
