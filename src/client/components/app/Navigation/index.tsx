import { ElementType, useEffect } from 'react';
import styled from 'styled-components';

import { useAppDispatch, useAppSelector, useWindowDimensions } from '@hooks';
import { SettingsActions, SettingsSelectors } from '@store';
import { WalletIcon, VaultIcon, LabsIcon, IronBankIcon, SettingsIcon } from '@components/common';

import { NavSidebar } from './NavSidebar';
import { NavTabbar } from './NavTabbar';

export interface NavigationLink {
  to: string;
  text: string;
  icon: ElementType;
  hideMobile?: boolean;
  ariaLabel: string;
}

const StyledNavigation = styled.div``;

const navLinks = [
  {
    to: '/portfolio',
    text: 'navigation.portfolio',
    icon: WalletIcon,
    ariaLabel: 'aria-label.navigation.portfolio',
  },
  {
    to: '/vaults',
    text: 'navigation.vaults',
    icon: VaultIcon,
    ariaLabel: 'aria-label.navigation.vaults',
  },
  {
    to: '/labs',
    text: 'navigation.labs',
    icon: LabsIcon,
    ariaLabel: 'aria-label.navigation.labs',
  },
  {
    to: '/ironbank',
    text: 'navigation.ironbank',
    icon: IronBankIcon,
    ariaLabel: 'aria-label.navigation.ironbank',
  },
  {
    to: '/settings',
    text: 'navigation.settings',
    icon: SettingsIcon,
    ariaLabel: 'aria-label.navigation.settings',
    // hideMobile: true,
  },
];

export const Navigation = () => {
  const { isMobile, isTablet, isDesktop } = useWindowDimensions();

  // NOTE Auto collapse sidenav on mobile
  const dispatch = useAppDispatch();
  const collapsedSidebar = useAppSelector(SettingsSelectors.selectSidebarCollapsed);

  useEffect(() => {
    if ((isTablet || isMobile) && !collapsedSidebar) {
      dispatch(SettingsActions.closeSidebar());
    }
    if (isDesktop && !isTablet && collapsedSidebar) {
      dispatch(SettingsActions.openSidebar());
    }
  }, [isMobile, isTablet, isDesktop]);

  return (
    <StyledNavigation>
      {!isMobile && <NavSidebar navLinks={navLinks} />}
      {isMobile && <NavTabbar navLinks={navLinks} />}
    </StyledNavigation>
  );
};
