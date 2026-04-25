# Mission M2: Dark Mode Toggle - Implementation Contract & Test Scenarios

## 1. CONTRACT ANALYSIS

### 1.1 Feature Requirements

**Primary Objective:** Implement a dark mode toggle that allows users to switch between light and dark themes throughout the application.

**Functional Requirements:**
- FR1: Toggle control must be visible and accessible in the Header component
- FR2: Theme preference must persist across browser sessions (localStorage)
- FR3: Theme switch must update all application components instantly
- FR4: Dark theme must maintain proper contrast ratios for accessibility
- FR5: Default theme is light mode for new users

**Non-Functional Requirements:**
- NFR1: Theme toggle must respond within 100ms
- NFR2: No visual glitches or flash during theme transition
- NFR3: Must work across all supported browsers
- NFR4: Must maintain WCAG 2.1 AA accessibility standards
- NFR5: State management must be centralized and consistent

### 1.2 Technical Specifications

**State Management:**
- Use Zustand global state store for theme preference
- Persist to localStorage with key "sgarden"
- State shape: `{ darkMode: boolean, setDarkMode: (darkMode) => void }`

**Theme Implementation:**
- MUI ThemeProvider with dynamic theme based on darkMode state
- Two theme objects: lightTheme and darkTheme
- Automatic color palette adjustments for dark mode
- CssBaseline component for consistent baseline styles

**UI Component:**
- Icon toggle button in Header (next to Logout button)
- Sun icon for light mode (when in dark mode)
- Moon icon for dark mode (when in light mode)
- Tooltip showing "Toggle Dark Mode" or similar
- Responsive design (visible on all screen sizes)

**Color Palette Specifications:**

Light Mode (existing):
- Background: #ffffff
- Surface: #ffffff
- Primary: #00426E
- Secondary: #00CBC4
- Text Primary: rgba(0, 0, 0, 0.87)
- Text Secondary: rgba(0, 0, 0, 0.6)

Dark Mode (new):
- Background: #121212
- Surface: #1e1e1e
- Primary: #64B5F6 (lighter blue)
- Secondary: #4DD0E1 (lighter cyan)
- Text Primary: rgba(255, 255, 255, 0.87)
- Text Secondary: rgba(255, 255, 255, 0.6)
- Paper: #2c2c2c

### 1.3 Affected Components

**Direct Changes:**
1. `frontend/src/index.js` - Theme creation and provider
2. `frontend/src/use-global-state.js` - Add darkMode state
3. `frontend/src/components/Header.js` - Add toggle button

**Indirect Impact (should work automatically with theme):**
4. All components using MUI theme colors
5. Components with custom styling referencing theme
6. makeStyles hooks using theme palette

### 1.4 Integration Points

**Data Flow:**
```
User clicks toggle → setDarkMode(newValue) → Zustand updates state → 
localStorage updated → theme recalculated → ThemeProvider re-renders → 
All children receive new theme → UI updates
```

**Dependencies:**
- Zustand (state management)
- MUI Theme system
- localStorage API
- React context (ThemeProvider)

### 1.5 Edge Cases & Error Handling

**Edge Cases:**
- EC1: localStorage unavailable (browser privacy mode)
- EC2: Corrupted localStorage data
- EC3: Theme switch during async operations
- EC4: Multiple tabs open (sync between tabs)
- EC5: First-time user (no saved preference)

**Error Handling Strategy:**
- Graceful fallback to light mode if localStorage fails
- Validate persisted data before applying
- Ignore sync between tabs (each tab independent)
- Default to light mode for new users

### 1.6 Acceptance Criteria

**Must Have:**
- AC1: Toggle button visible in Header when authenticated
- AC2: Clicking toggle switches between light and dark themes
- AC3: Theme preference persists after browser refresh
- AC4: All text remains readable in both themes
- AC5: No console errors or warnings

**Should Have:**
- AC6: Smooth transition animation (optional enhancement)
- AC7: System preference detection (prefers-color-scheme)
- AC8: Toggle keyboard accessible (Tab + Enter)

**Nice to Have:**
- AC9: Auto-switch based on time of day
- AC10: Custom theme color picker

---

## 2. TEST SCENARIOS

### 2.1 Functional Test Scenarios

#### TS-F1: Toggle Visibility
**Precondition:** User is authenticated and on Dashboard
**Steps:**
1. Navigate to Dashboard
2. Locate Header component
3. Verify dark mode toggle is visible
**Expected:** Toggle button with moon/sun icon visible in Header

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F2: Light to Dark Mode Switch
**Precondition:** Application is in light mode (default)
**Steps:**
1. Log in as user
2. Navigate to Dashboard
3. Click dark mode toggle
4. Observe theme change
**Expected:** 
- Theme switches to dark mode immediately
- Background becomes dark (#121212)
- Text becomes light (white/off-white)
- Toggle icon changes from moon to sun

**Test Data:** 
- Username: "user"
- Password: "12345678"

**Priority:** Critical
**Automation:** Cypress

---

#### TS-F3: Dark to Light Mode Switch
**Precondition:** Application is in dark mode
**Steps:**
1. Ensure dark mode is enabled
2. Click dark mode toggle
3. Observe theme change
**Expected:**
- Theme switches to light mode immediately
- Background becomes white
- Text becomes dark
- Toggle icon changes from sun to moon

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F4: Persistence After Refresh
**Precondition:** User has enabled dark mode
**Steps:**
1. Enable dark mode
2. Refresh browser (F5)
3. Verify theme is still dark
**Expected:** Dark mode persists after refresh

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F5: Persistence Across Navigation
**Precondition:** User has enabled dark mode
**Steps:**
1. Enable dark mode on Dashboard
2. Navigate to Profile page
3. Navigate to Dashboard1
4. Navigate back to Dashboard
5. Verify theme remains dark throughout
**Expected:** Dark mode persists across all page navigations

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

#### TS-F6: Toggle for Unauthenticated Users
**Precondition:** User is not logged in
**Steps:**
1. Navigate to sign-in page
2. Check Header for dark mode toggle
**Expected:** Toggle should not be visible (or optionally visible on public pages)

**Test Data:** N/A
**Priority:** Medium
**Automation:** Cypress

---

### 2.2 Non-Functional Test Scenarios

#### TS-NF1: Performance - Toggle Response Time
**Precondition:** Application loaded
**Steps:**
1. Measure time from toggle click to theme update completion
**Expected:** < 100ms response time

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual/Performance testing

---

#### TS-NF2: Accessibility - Keyboard Navigation
**Precondition:** User on Dashboard
**Steps:**
1. Use Tab key to navigate to toggle
2. Press Enter to activate toggle
3. Verify theme switches
**Expected:** Toggle is keyboard accessible and functional

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress (with keyboard commands)

---

#### TS-NF3: Accessibility - Screen Reader Compatibility
**Precondition:** Screen reader active
**Steps:**
1. Navigate to toggle with screen reader
2. Verify aria-label is announced
3. Activate toggle
4. Verify state change is announced
**Expected:** Proper ARIA labels and announcements

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual (with screen reader)

---

#### TS-NF4: Visual - No Flash or Flicker
**Precondition:** Application in light mode
**Steps:**
1. Click toggle rapidly 5 times
2. Observe theme transitions
**Expected:** No visual glitches, smooth transitions

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual observation

---

### 2.3 Integration Test Scenarios

#### TS-I1: State Sync with Zustand
**Precondition:** Application loaded
**Steps:**
1. Toggle dark mode on
2. Open browser console
3. Check localStorage for 'sgarden' key
4. Verify darkMode: true in stored state
**Expected:** State correctly persisted in localStorage

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress (with localStorage assertions)

---

#### TS-I2: MUI Components Theme Integration
**Precondition:** Dark mode enabled
**Steps:**
1. Enable dark mode
2. Navigate to page with MUI components (Dashboard, Profile)
3. Verify all MUI components use dark theme colors
**Expected:** Buttons, inputs, cards, etc. all reflect dark theme

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress (visual regression)

---

#### TS-I3: Custom Styled Components
**Precondition:** Dark mode enabled
**Steps:**
1. Enable dark mode
2. Check custom styled components (Header, Footer, Cards)
3. Verify they respect theme palette
**Expected:** All components adapt to dark theme

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

### 2.4 Error Handling Test Scenarios

#### TS-E1: localStorage Unavailable
**Precondition:** localStorage disabled in browser
**Steps:**
1. Disable localStorage (privacy mode)
2. Toggle dark mode
3. Verify app doesn't crash
**Expected:** App falls back gracefully, no errors in console

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual

---

#### TS-E2: Corrupted State Data
**Precondition:** localStorage contains invalid data
**Steps:**
1. Manually set localStorage 'sgarden' to invalid JSON
2. Refresh application
3. Verify app loads with default theme
**Expected:** App recovers with default light theme

**Test Data:** localStorage.setItem('sgarden', '{invalid json}')
**Priority:** Low
**Automation:** Cypress

---

### 2.5 Regression Test Scenarios

#### TS-R1: Existing Functionality Unaffected
**Precondition:** Dark mode implemented
**Steps:**
1. Run all existing test suites
2. Verify no tests broken by dark mode changes
**Expected:** All existing tests pass

**Test Data:** Full test suite
**Priority:** Critical
**Automation:** Cypress (full suite)

---

#### TS-R2: Authentication Flow
**Precondition:** Dark mode enabled
**Steps:**
1. Enable dark mode
2. Log out
3. Log back in
4. Verify dark mode persists
**Expected:** Theme preference maintained through auth flow

**Test Data:** Valid credentials
**Priority:** High
**Automation:** Cypress

---

## 3. SMOKE TEST COVERAGE

### 3.1 Smoke Test Suite for Dark Mode (M2)

**File:** `frontend/cypress/e2e/smoke/1-easy.cy.js`

**Test Cases:**

```javascript
describe("M2: Dark Mode Toggle", () => {
  beforeEach(() => {
    cy.loginAsUser();
    cy.visit("/dashboard");
  });

  it("M2.1: Should display dark mode toggle in Header (10 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').should("be.visible");
  });

  it("M2.2: Should toggle to dark mode when clicked (20 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
  });

  it("M2.3: Should toggle back to light mode (20 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').click(); // Enable dark
    cy.get('[data-testid="dark-mode-toggle"]').click(); // Disable dark
    cy.get("body").should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("M2.4: Should persist dark mode after refresh (20 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.reload();
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
  });

  it("M2.5: Should persist dark mode across navigation (10 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').click();
    cy.visit("/profile");
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
    cy.visit("/dashboard1");
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
  });

  it("M2.6: Should be keyboard accessible (10 pts)", () => {
    cy.get('[data-testid="dark-mode-toggle"]').focus().type("{enter}");
    cy.get("body").should("have.css", "background-color", "rgb(18, 18, 18)");
  });

  afterEach(() => {
    // Reset to light mode
    cy.window().then((win) => {
      const state = JSON.parse(win.localStorage.getItem("sgarden"));
      if (state && state.state) {
        state.state.darkMode = false;
        win.localStorage.setItem("sgarden", JSON.stringify(state));
      }
    });
  });
});
```

**Total Points for M2:** 90 points

---

### 3.2 Manual Smoke Test Checklist

- [ ] Toggle button visible in Header when authenticated
- [ ] Toggle button not visible when not authenticated
- [ ] Clicking toggle switches theme from light to dark
- [ ] Clicking toggle switches theme from dark to light
- [ ] Icon changes from moon to sun when in dark mode
- [ ] Icon changes from sun to moon when in light mode
- [ ] Dark mode persists after browser refresh
- [ ] Dark mode persists across page navigation
- [ ] All text readable in dark mode
- [ ] All buttons visible in dark mode
- [ ] Forms usable in dark mode
- [ ] No console errors when toggling
- [ ] localStorage contains darkMode state
- [ ] Toggle works on mobile viewport
- [ ] Toggle accessible via keyboard
- [ ] Tooltip shows on toggle hover

---

## 4. IMPLEMENTATION CHECKLIST

### 4.1 Code Changes Required

- [x] Update `frontend/src/use-global-state.js`
  - Add darkMode: false
  - Add setDarkMode function

- [ ] Update `frontend/src/index.js`
  - Create lightTheme and darkTheme objects
  - Use darkMode state to select active theme
  - Pass dynamic theme to ThemeProvider

- [ ] Update `frontend/src/components/Header.js`
  - Import Brightness4 (moon) and Brightness7 (sun) icons
  - Add dark mode toggle button to buttons array
  - Add data-testid attribute for testing

- [ ] Create dark theme color palette
  - Define dark mode colors
  - Ensure proper contrast ratios
  - Test with all existing components

- [ ] Add Cypress test file
  - Implement smoke tests as defined above
  - Add custom commands if needed

### 4.2 Testing Checklist

- [ ] Run Cypress smoke tests
- [ ] Manual testing on Chrome
- [ ] Manual testing on Firefox
- [ ] Manual testing on Safari
- [ ] Mobile viewport testing
- [ ] Keyboard navigation testing
- [ ] Screen reader testing (optional)
- [ ] Performance testing (toggle response time)

### 4.3 Documentation

- [ ] Update README if needed
- [ ] Add JSDoc comments to new functions
- [ ] Document theme structure
- [ ] Add troubleshooting guide

---

## 5. RISK ASSESSMENT

### 5.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| localStorage not available | Low | Medium | Fallback to in-memory state |
| Theme flash on load | Medium | Low | Apply theme before render |
| Custom components not respecting theme | Medium | High | Comprehensive testing |
| Performance degradation | Low | Medium | Use React.memo and optimization |
| Breaking existing styles | Medium | High | Thorough regression testing |

### 5.2 UX Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Poor contrast in dark mode | Medium | High | Follow WCAG guidelines |
| Confusing toggle icon | Low | Low | Use standard moon/sun icons |
| Unexpected theme switch | Low | Medium | Clear visual feedback |

---

## 6. ROLLBACK PLAN

If critical issues arise:

1. **Immediate:** Remove toggle button from Header (hide feature)
2. **Short-term:** Force light mode in theme creation
3. **Complete rollback:** Revert commits for dark mode implementation

**Rollback triggers:**
- Application crashes when toggling
- Data loss or corruption
- Critical accessibility violations
- More than 3 high-priority bugs

---

## 7. SUCCESS METRICS

### 7.1 Quantitative Metrics

- All 6 smoke tests pass (100%)
- No new console errors
- Toggle response time < 100ms
- Test coverage > 85% for new code
- Zero critical bugs in production

### 7.2 Qualitative Metrics

- User feedback positive
- Accessibility audit pass
- Code review approval
- Documentation complete

---

## 8. CONCLUSION

This document provides a comprehensive contract analysis and test coverage plan for Mission M2: Dark Mode Toggle. The implementation follows MUI best practices, integrates with existing Zustand state management, and includes extensive testing scenarios to ensure quality and reliability.

**Estimated Effort:** 4-6 hours
**Complexity:** Medium
**Points Value:** 90 points (Easy tier)
