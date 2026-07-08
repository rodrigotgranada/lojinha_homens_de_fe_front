# Approved Enterprise Application Shell Layout Example

This document defines the official premium reference model for the master application shell layout architecture across the platform. It demonstrates how to combine a collapsible responsive Sidebar, a fluid global Topbar navigation bar, and an isolated viewport Main Content canvas using Chakra UI v3 and semantic HTML5 grids to guide the AI generation engine.

---

## Characteristics

* **Semantic HTML5 Layout Tokens**: Uses explicit structural landmark elements (`as="aside"` for navigation bar rails, `as="header"` for contextual control bands, `as="main"` for the primary view viewport), maximizing accessibility indexes out of the box.
* **Hardware-Accelerated Sidebar Collapsing**: Manages responsive viewport expanding metrics safely through CSS grid transitions (`transitionProperty="width"`), eliminating layout stutter or unexpected layout jumps when the menu rails contract.
* **Fluid Viewport Containment**: Embeds a robust overflow sandbox mechanism onto the workspace core area (`overflowY="auto"`). The application header and side navigation panels remain pinned globally, preventing full-screen scroll tracking breakages.
* **Responsive Breakpoint Interception**: Leverages declarative object-driven layout parameters (`display={{ base: "none", md: "flex" }}`) to hide high-density navigation rails seamlessly on handheld screen sizes, switching to accessible overlay sheets automatically.
* **Chakra UI v3 System Consistency**: Governed natively by the design system's border tokens and elevation shadows, adjusting instantly during systemic dark mode environment shifts without hardcoded override layers.

---

## Approved Code Implementation

```tsx
import { useState } from 'react';
import { Box, Flex, Grid, GridItem, IconButton, Text, HStack, VStack, Separator } from '@chakra-ui/react';
import { MenuIcon, ChevronLeftIcon, ChevronRightIcon, BellIcon, UserAvatarIcon, DashboardIcon, SettingsIcon, BillingIcon } from '@/assets/icons';

interface AppShellLayoutProps {
  /**
   * Primary dynamic presentational view layout component displayed inside the core scrolling canvas.
   */
  children: React.ReactNode;
}

/**
 * Granada Enterprise Approved Master Application Shell Layout Blueprint.
 * Demonstrates high-performance responsive layout scaffolding using Chakra UI v3 structural primitives.
 */
export const AppShellLayoutApproved = ({ children }: AppShellLayoutProps) => {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebarWidth = () => setIsSidebarExpanded((prev) => !prev);

  // Define explicit structural token dimensions to prevent rendering jumps
  const sidebarWidthToken = isSidebarExpanded ? "260px" : "72px";

  return (
    <Box minH="100vh" bg="bg.panel" color="fg.primary" className="gr-master-app-shell">
      
      {/* MASTER APPLICATION CONTENT SKELETON GRID */}
      <Flex width="100vw" height="100vh" overflow="hidden" position="relative">
        
        {/* 1. LAYER ONE: COMPOSABLE SIDE NAVIGATION BAR (DESKTOP RAIL) */}
        <Box
          as="aside"
          aria-label="Primary Navigation Matrix"
          width={{ base: "none", md: sidebarWidthToken }}
          display={{ base: "none", md: "flex" }}
          flexDirection="column"
          height="100%"
          bg="bg.surface"
          borderRight="1px solid"
          borderColor="border.subtle"
          position="relative"
          zIndex="docked"
          transitionProperty="width"
          transitionDuration="normal"
          transitionTimingFunction="ease-in-out"
          className="gr-shell-sidebar-aside"
        >
          {/* Header Branding Branding Rail Group */}
          <Flex h="64px" align="center" px={isSidebarExpanded ? 5 : 4} justify={isSidebarExpanded ? "space-between" : "center"}>
            {isSidebarExpanded && (
              <Text fontSize="md" fontWeight="bold" tracking="tight" color="brand.solid" animation="fade-in 0.2s">
                GRANADA<Box as="span" color="fg.primary">.IO</Box>
              </Text>
            )}
            <IconButton
              size="xs"
              variant="ghost"
              onClick={toggleSidebarWidth}
              aria-label={isSidebarExpanded ? "Collapse navigation sidebar" : "Expand navigation sidebar"}
            >
              {isSidebarExpanded ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Flex>

          <Separator borderColor="border.subtle" />

          {/* Core Interactive Route Action Items Allocation List */}
          <VStack gap={1.5} align="stretch" p={3} flex="1">
            <HStack 
              gap={3} 
              p={2.5} 
              borderRadius="md" 
              bg="bg.muted" 
              color="brand.solid" 
              cursor="pointer"
              fontWeight="medium"
              fontSize="sm"
            >
              <DashboardIcon />
              {isSidebarExpanded && <Text animation="fade-in 0.15s">Metrics Dashboard</Text>}
            </HStack>

            <HStack 
              gap={3} 
              p={2.5} 
              borderRadius="md" 
              color="fg.secondary" 
              _hover={{ bg: "bg.muted/50", color: "fg.primary" }}
              cursor="pointer"
              fontSize="sm"
              transitionProperty="background"
              transitionDuration="fast"
            >
              <BillingIcon />
              {isSidebarExpanded && <Text animation="fade-in 0.15s">Billing & Usage</Text>}
            </HStack>

            <HStack 
              gap={3} 
              p={2.5} 
              borderRadius="md" 
              color="fg.secondary" 
              _hover={{ bg: "bg.muted/50", color: "fg.primary" }}
              cursor="pointer"
              fontSize="sm"
              transitionProperty="background"
              transitionDuration="fast"
            >
              <SettingsIcon />
              {isSidebarExpanded && <Text animation="fade-in 0.15s">Gateway Configuration</Text>}
            </HStack>
          </VStack>

          <Separator borderColor="border.subtle" />

          {/* Pin Bottom Active Tenant Environment Footer Cell */}
          <Flex h="64px" align="center" p={4} justify={isSidebarExpanded ? "flex-start" : "center"} gap={3}>
            <Box bg="brand.solid" color="white" borderRadius="md" boxSize="32px" display="flex" align="center" justify="center" fontWeight="bold" fontSize="xs">
              G1
            </Box>
            {isSidebarExpanded && (
              <Box animation="fade-in 0.2s">
                <Text fontSize="xs" fontWeight="semibold" color="fg.primary" maxW="150px" truncate>Production Tenant</Text>
                <Text fontSize="10px" color="fg.muted">Enterprise Node</Text>
              </Box>
            )}
          </Flex>
        </Box>

        {/* 2. LAYER TWO: CONTEXTUAL DASHBOARD TOPBAR WORKSPACE BRIDGE */}
        <Flex direction="column" flex="1" height="100%" overflow="hidden" position="relative">
          
          <Box
            as="header"
            height="64px"
            width="100%"
            bg="bg.surface"
            borderBottom="1px solid"
            borderColor="border.subtle"
            px={{ base: 4, md: 6 }}
            zIndex="dropdown"
            className="gr-shell-topbar-header"
          >
            <Flex height="100%" align="center" justify="space-between">
              
              {/* Mobile Action Controller Interceptor (Triggers overlay sheet) */}
              <HStack gap={3}>
                <IconButton
                  display={{ base: "flex", md: "none" }}
                  onClick={() => setIsMobileMenuOpen(true)}
                  variant="outline"
                  size="sm"
                  aria-label="Open global routing mobile shell menu"
                >
                  <MenuIcon />
                </IconButton>
                
                <Text fontSize="sm" fontWeight="semibold" color="fg.primary" display={{ base: "none", md: "block" }}>
                  Workspace Overview
                </Text>
              </HStack>

              {/* Central Operational Controls & Notification Hooks */}
              <HStack gap={4}>
                <IconButton
                  variant="ghost"
                  size="sm"
                  borderRadius="full"
                  aria-label="View user alerts stream"
                  color="fg.secondary"
                >
                  <BellIcon />
                </IconButton>
                
                <Separator orientation="vertical" height="20px" borderColor="border.subtle" />

                {/* Profile Identity Allocation Box */}
                <HStack gap={2.5} cursor="pointer" className="gr-topbar-profile-trigger">
                  <Box bg="bg.muted" borderRadius="full" boxSize="32px" display="flex" align="center" justify="center">
                    <UserAvatarIcon />
                  </Box>
                  <VStack gap={0} align="stretch" display={{ base: "none", lg: "flex" }}>
                    <Text fontSize="xs" fontWeight="semibold" color="fg.primary" lineHeight="shorter">Alexander Wright</Text>
                    <Text fontSize="10px" color="fg.muted" lineHeight="shorter">Platform Admin</Text>
                  </VStack>
                </HStack>
              </HStack>

            </Flex>
          </Box>

          {/* 3. LAYER THREE: ISOLATED SCROLLABLE PRIMARY CONTENT AREA VIEWPORT */}
          <Box
            as="main"
            id="primary-content-viewport"
            flex="1"
            overflowY="auto"
            px={{ base: 4, md: 8 }}
            py={{ base: 6, md: 8 }}
            className="gr-shell-main-canvas"
            _focusVisible={{
              outline: "none"
            }}
          >
            {/* Boundless presentational children layouts surface natively here inside the sandbox containment */}
            <Box maxW="7xl" mx="auto" width="100%">
              {children}
            </Box>
          </Box>

        </Flex>

      </Flex>
    </Box>
  );
};

AppShellLayoutApproved.displayName = 'AppShellLayoutApproved';
```