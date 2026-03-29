import SwiftUI

struct ContentView: View {
    var body: some View {
        NavigationStack {
            HomeView()
        }
        .tint(Color.accentColor)
    }
}

#Preview {
    ContentView()
}
