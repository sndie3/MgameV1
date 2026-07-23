export type MENUIDS = "pinoyGames" | "eCasino" | "eBingo" ;

export const MENUS: {
  id?: MENUIDS;
  icon: string;
  title: string;
  route: string
}[] = [
    {
        id: "pinoyGames",
        icon: "/assets/icons/PinoyGame.png",
        title: "Pinoy Games",
        route: "/pinoy-games"
    },
    {
        id: "eCasino",
        icon: "/assets/icons/E-Casino.png",
        title: "E-Casino",
        route: "/e-casino"
    },
    {
        id: "eBingo",
        icon: "/assets/icons/E-Bingo.png",
        title: "E-Bingo",
        route: "/e-bingo"
    },
    {
        icon: "/assets/icons/Cash-In.png",
        title: "Cash-In",
        route: "/cash-in"
    },
    {
        icon: "/assets/icons/Wallet.png",
        title: "Cash-Out",
        route: "/cash-out"
    },
    {
        icon: "/assets/icons/Support.png",
        title: "Support",
        route: "/support"
    },
];

// FULLY VERIFIED
export const TABS = [
    { label: "Recently" },
    { label: "Invite", icon: "/assets/icons/Invites.png" },
    { label: "Rewards" },
    { label: "EPT" },
];