export default function CenterLayout({ children }) {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f8f9fa",
                paddingTop: "80px", // keeps navbar visible & spacing correct
            }}
        >
            {children}
        </div>
    );
}
