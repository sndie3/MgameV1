import { Routes, Route } from "react-router-dom";
import Home from "../features/home/Home";
import Login from "../features/auth/Login";
import Disclaimer from "../features/auth/Disclaimer";
import Register from "../features/auth/Register";
import Reset from "../features/auth/Reset";
import BaseLayout from "../layouts/BaseLayout";
import Dashboard from "../features/dashboard/Dashboard";
import Profile from "../features/dashboard/pages/Profile";
import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import CashIn from "../features/cashin/CashIn";
import CashOut from "../features/cashout/CashOut"
import Support from "../features/support/Support";
import HowToUse from "../features/howtouse/HowToUse";
import Settings from "../features/settings/Settings";
import BetLimitView from "../features/settings/BetLimitView";
import SelfExclusionView from "../features/settings/SelfExclusionView";
import CashInLimitView from "../features/settings/CashInLimitView";
import NotificationsView from "../features/settings/NotificationsView";
import DeactivateAccountView from "../features/settings/DeactivateAccountView";
import ChatSettingsView from "../features/settings/ChatSettingsView";
import ChatWallpaperView from "../features/settings/ChatWallpaperView";
import ChangeChatNameView from "../features/settings/ChangeChatNameView";
import ChangeAppIconView from "../features/settings/ChangeAppIconView";
import PinoyGames from "../features/pinoy-games/PinoyGames";
import Ecasino from "../features/e-casino/Ecasino";
import Ebingo from "../features/e-bingo/Ebingo";
import Gift from "../features/gift/Gift";
import LiveGame from "../features/pinoy-games/hari-tari/LiveGame"
import GameTimeGuard from "../routes/GameTimeGuard"
import HariTari from "../features/Hari-tari-op/Hari-tari"
import Haritaritrends from "../features/Hari-tari-op/Hari-tari-trends"
import ThreeSMania from "../features/pinoy-games/3smania/LiveGame";

export default function AppRoutes() {

  return (
    <Routes>
      {/* Main Website */}
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="disclaimer" element={<Disclaimer />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset" element={<Reset />} />
      </Route>

      {/* Protected Routes */}

      {/* 
      FLOW -- Protected Route -> Render AuthenticatedLayout -> Access Routes 
      If not authenticated, redirect to login page */}

      <Route element={<ProtectedRoute />}>
        <Route element={<AuthenticatedLayout />}>
          {/* // Dashboard and other protected routes */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="cash-in" element={<CashIn />} />
          <Route path="cash-out" element={<CashOut />} />
          <Route path="support" element={<Support />} />
          <Route path="how-to-use" element={<HowToUse />} />
          <Route path="pinoy-games" element={<PinoyGames />} />
          <Route path="e-casino" element={<Ecasino />} />
          <Route path="e-bingo" element={<Ebingo />} />
          <Route path="settings" element={<Settings />} />
          <Route path="settings/bet-limit" element={<BetLimitView />} />
          <Route path="settings/self-exclusion" element={<SelfExclusionView />} />
          <Route path="settings/cash-in-limit" element={<CashInLimitView />} />
          <Route path="settings/notifications" element={<NotificationsView />} />
          <Route path="settings/deactivate-account" element={<DeactivateAccountView />} />
          <Route path="settings/chat-settings" element={<ChatSettingsView />} />
          <Route path="settings/chat-wallpaper" element={<ChatWallpaperView />} />
          <Route path="settings/change-chat-name" element={<ChangeChatNameView />} />
          <Route path="settings/change-app-icon" element={<ChangeAppIconView />} />
          <Route path="gift" element={<Gift />} />

            //LIVE GAME
          <Route element={<GameTimeGuard />}>
          </Route>
                      <Route path="/hari-tari-play-game" element={<LiveGame />} />
                      <Route path="/3smania-play-game" element={<ThreeSMania/>}/>

          <Route path="hari-tari-operator" element={<HariTari/>}/>
          <Route path="hari-tari-trends" element={<Haritaritrends/>}/>

        </Route>
      </Route>


      {/* 404 */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}