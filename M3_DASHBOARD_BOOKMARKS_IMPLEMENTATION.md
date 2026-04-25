# Mission M3: Dashboard Bookmarks - Implementation Contract & Test Scenarios

## 1. CONTRACT ANALYSIS

### 1.1 Feature Requirements

**Primary Objective:** Implement a bookmark system that allows users to mark and quickly access their favorite dashboards.

**Functional Requirements:**
- FR1: Each dashboard page (Dashboard, Dashboard1, Dashboard2) must have a bookmark toggle button
- FR2: Clicking the toggle should add/remove the dashboard from bookmarks
- FR3: Bookmark state must persist across browser sessions (localStorage)
- FR4: Visual indicator must show when a dashboard is bookmarked
- FR5: Bookmarked dashboards should be easily accessible (e.g., in sidebar or header)
- FR6: Default state is no bookmarks for new users

**Non-Functional Requirements:**
- NFR1: Toggle response must be instant (< 50ms)
- NFR2: Bookmark state must sync across multiple tabs (same browser)
- NFR3: UI must clearly distinguish bookmarked vs non-bookmarked state
- NFR4: Must work for all user roles (user and admin)
- NFR5: Bookmarks are user-specific (not shared across accounts)

### 1.2 Technical Specifications

**State Management:**
- Use Zustand global state store for bookmark data
- Persist to localStorage with key "sgarden"
- State shape: `{ bookmarks: string[], toggleBookmark: (pageId) => void }`
- pageId format: "dashboard", "dashboard1", "dashboard2"

**UI Component:**
- Bookmark toggle button on each dashboard page
- Position: Top-right corner of page (near region dropdown)
- Icons: 
  - Bookmarked: Star icon (filled)
  - Not bookmarked: StarBorder icon (outline)
- Color: Secondary color when active, grey when inactive
- Tooltip: "Bookmark this page" / "Remove bookmark"

**Visual Indicators:**
- Active state: Filled star icon + test indicator element
- Inactive state: Outline star icon
- Test attributes:
  - `data-testid="bookmark-toggle-{pageId}"` on toggle button
  - `data-testid="bookmark-active-{pageId}"` on active indicator

**Bookmark Display:**
- Option 1: Add bookmarked dashboards to Sidebar with star icon
- Option 2: Create quick access menu in Header
- Option 3: Both sidebar and header integration
- **Chosen:** Sidebar integration with star icons

### 1.3 Affected Components

**Direct Changes:**
1. `frontend/src/use-global-state.js` - Add bookmarks state
2. `frontend/src/screens/Dashboard.js` - Add bookmark toggle
3. `frontend/src/screens/Dashboard1.js` - Add bookmark toggle
4. `frontend/src/screens/Dashboard2.js` - Add bookmark toggle
5. `frontend/src/components/Sidebar.js` - Display bookmark indicators

**New Components:**
6. `frontend/src/components/BookmarkToggle.js` - Reusable toggle component (optional)

### 1.4 Integration Points

**Data Flow:**
```
User clicks toggle → toggleBookmark(pageId) → Zustand updates state → 
localStorage persisted → bookmarks array updated → 
UI re-renders with new bookmark state → Sidebar shows star indicator
```

**Dependencies:**
- Zustand (state management)
- MUI Icons (Star, StarBorder)
- localStorage API
- React context

### 1.5 Edge Cases & Error Handling

**Edge Cases:**
- EC1: localStorage unavailable (browser privacy mode)
- EC2: Corrupted bookmarks data in localStorage
- EC3: User bookmarks all dashboards
- EC4: User removes all bookmarks
- EC5: Multiple tabs open (sync between tabs)
- EC6: Invalid pageId passed to toggleBookmark
- EC7: First-time user (no saved bookmarks)

**Error Handling Strategy:**
- Graceful fallback to empty bookmarks array if localStorage fails
- Validate pageId before adding to bookmarks
- Prevent duplicate bookmarks in array
- Handle localStorage quota exceeded gracefully

### 1.6 Acceptance Criteria

**Must Have:**
- AC1: Bookmark toggle visible on all three dashboard pages
- AC2: Clicking toggle adds/removes bookmark
- AC3: Bookmark state persists after browser refresh
- AC4: Visual indicator shows bookmarked state
- AC5: No console errors or warnings
- AC6: All Cypress tests pass

**Should Have:**
- AC7: Bookmarks visible in Sidebar with star icons
- AC8: Smooth transition animation on toggle
- AC9: Tooltip explaining bookmark functionality
- AC10: Keyboard accessible (Tab + Enter)

**Nice to Have:**
- AC11: Bookmark order customization (drag & drop)
- AC12: Maximum bookmark limit (e.g., 10 bookmarks)
- AC13: Export/import bookmarks
- AC14: Bookmark sync across devices (requires backend)

---

## 2. TEST SCENARIOS

### 2.1 Functional Test Scenarios

#### TS-F1: Bookmark Toggle Visibility - Dashboard
**Precondition:** User is authenticated and on /dashboard
**Steps:**
1. Navigate to /dashboard
2. Locate bookmark toggle button
**Expected:** Toggle button with star icon visible on page

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F2: Bookmark Toggle Visibility - Dashboard1
**Precondition:** User is authenticated and on /dashboard1
**Steps:**
1. Navigate to /dashboard1
2. Locate bookmark toggle button
**Expected:** Toggle button with star icon visible on page

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F3: Bookmark Toggle Visibility - Dashboard2
**Precondition:** User is authenticated and on /dashboard2
**Steps:**
1. Navigate to /dashboard2
2. Locate bookmark toggle button
**Expected:** Toggle button with star icon visible on page

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F4: Add Bookmark - Dashboard1
**Precondition:** Dashboard1 is not bookmarked
**Steps:**
1. Navigate to /dashboard1
2. Click bookmark toggle
3. Verify active indicator appears
**Expected:** 
- Star icon changes from outline to filled
- Active indicator visible
- Bookmark added to state

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F5: Remove Bookmark
**Precondition:** Dashboard1 is bookmarked
**Steps:**
1. Navigate to /dashboard1 (already bookmarked)
2. Click bookmark toggle
3. Verify active indicator disappears
**Expected:**
- Star icon changes from filled to outline
- Active indicator hidden
- Bookmark removed from state

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F6: Persistence After Refresh
**Precondition:** User has bookmarked Dashboard1
**Steps:**
1. Bookmark Dashboard1
2. Refresh browser (F5)
3. Navigate to /dashboard1
4. Verify bookmark state persists
**Expected:** Dashboard1 still shows as bookmarked after refresh

**Test Data:** N/A
**Priority:** Critical
**Automation:** Cypress

---

#### TS-F7: Multiple Bookmarks
**Precondition:** No bookmarks active
**Steps:**
1. Bookmark Dashboard
2. Navigate to Dashboard1 and bookmark it
3. Navigate to Dashboard2 and bookmark it
4. Verify all three are bookmarked
**Expected:** All three dashboards show bookmarked state

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

#### TS-F8: Bookmark Indicator in Sidebar
**Precondition:** Dashboard1 is bookmarked
**Steps:**
1. Bookmark Dashboard1
2. Check Sidebar navigation
3. Verify star indicator appears next to "Analytics" link
**Expected:** Sidebar shows visual indicator for bookmarked page

**Test Data:** N/A
**Priority:** Medium
**Automation:** Cypress

---

#### TS-F9: Bookmark State Across Navigation
**Precondition:** Dashboard is bookmarked
**Steps:**
1. Bookmark Dashboard
2. Navigate to Profile
3. Navigate back to Dashboard
4. Verify bookmark state maintained
**Expected:** Bookmark persists across page navigation

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

#### TS-F10: No Bookmarks Initially
**Precondition:** New user / cleared localStorage
**Steps:**
1. Clear localStorage
2. Login and navigate to Dashboard
3. Check bookmark toggle state
**Expected:** No dashboards bookmarked by default

**Test Data:** N/A
**Priority:** Medium
**Automation:** Cypress

---

### 2.2 Non-Functional Test Scenarios

#### TS-NF1: Performance - Toggle Response Time
**Precondition:** Application loaded
**Steps:**
1. Measure time from toggle click to state update
**Expected:** < 50ms response time

**Test Data:** N/A
**Priority:** Medium
**Automation:** Performance testing

---

#### TS-NF2: Accessibility - Keyboard Navigation
**Precondition:** User on Dashboard
**Steps:**
1. Use Tab key to navigate to bookmark toggle
2. Press Enter to activate toggle
3. Verify bookmark added
**Expected:** Toggle is keyboard accessible and functional

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress (with keyboard commands)

---

#### TS-NF3: Accessibility - Screen Reader Compatibility
**Precondition:** Screen reader active
**Steps:**
1. Navigate to bookmark toggle with screen reader
2. Verify aria-label is announced
3. Activate toggle
4. Verify state change is announced
**Expected:** Proper ARIA labels and announcements

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual (with screen reader)

---

#### TS-NF4: Visual - Icon State Transition
**Precondition:** Dashboard not bookmarked
**Steps:**
1. Click bookmark toggle
2. Observe icon transition
**Expected:** Smooth transition from outline to filled star

**Test Data:** N/A
**Priority:** Low
**Automation:** Visual testing

---

#### TS-NF5: Cross-Tab Synchronization
**Precondition:** Application open in two tabs
**Steps:**
1. Open Dashboard in Tab 1
2. Open Dashboard in Tab 2
3. Bookmark Dashboard in Tab 1
4. Check Tab 2 (after reload)
**Expected:** Bookmark state syncs across tabs (via localStorage)

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual

---

### 2.3 Integration Test Scenarios

#### TS-I1: State Sync with Zustand
**Precondition:** Application loaded
**Steps:**
1. Bookmark Dashboard
2. Open browser console
3. Check localStorage for 'sgarden' key
4. Verify bookmarks array contains 'dashboard'
**Expected:** State correctly persisted in localStorage

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress (with localStorage assertions)

---

#### TS-I2: Sidebar Integration
**Precondition:** Dashboard1 bookmarked
**Steps:**
1. Bookmark Dashboard1
2. Check Sidebar component
3. Verify star icon appears next to "Analytics"
**Expected:** Sidebar visually indicates bookmarked pages

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

#### TS-I3: Multiple User Sessions
**Precondition:** Two different user accounts
**Steps:**
1. Login as User A, bookmark Dashboard
2. Logout and login as User B
3. Verify User B has no bookmarks
4. Login back as User A
5. Verify User A's bookmark persists
**Expected:** Bookmarks are user-specific (stored separately)

**Test Data:** 
- User A: username="admin", password="12345678"
- User B: username="user", password="12345678"

**Priority:** Medium
**Automation:** Cypress

---

### 2.4 Error Handling Test Scenarios

#### TS-E1: localStorage Unavailable
**Precondition:** localStorage disabled in browser
**Steps:**
1. Disable localStorage (privacy mode)
2. Click bookmark toggle
3. Verify app doesn't crash
**Expected:** App falls back gracefully, bookmarks work in-memory

**Test Data:** N/A
**Priority:** Medium
**Automation:** Manual

---

#### TS-E2: Corrupted Bookmarks Data
**Precondition:** localStorage contains invalid bookmarks data
**Steps:**
1. Manually set localStorage bookmarks to invalid value
2. Refresh application
3. Verify app loads with empty bookmarks array
**Expected:** App recovers with default empty bookmarks

**Test Data:** localStorage.setItem('sgarden', '{state: {bookmarks: "invalid"}}')
**Priority:** Low
**Automation:** Cypress

---

#### TS-E3: Invalid PageId
**Precondition:** Component calls toggleBookmark with invalid ID
**Steps:**
1. Programmatically call toggleBookmark("invalid-page")
2. Verify no error thrown
3. Verify bookmarks array unchanged
**Expected:** Invalid pageIds are ignored gracefully

**Test Data:** N/A
**Priority:** Low
**Automation:** Unit testing

---

### 2.5 Regression Test Scenarios

#### TS-R1: Existing Functionality Unaffected
**Precondition:** Bookmarks implemented
**Steps:**
1. Run all existing test suites
2. Verify no tests broken by bookmark changes
**Expected:** All existing tests pass

**Test Data:** Full test suite
**Priority:** Critical
**Automation:** Cypress (full suite)

---

#### TS-R2: Dashboard Data Loading
**Precondition:** Bookmarks enabled
**Steps:**
1. Navigate to each dashboard
2. Verify data loads correctly
3. Verify charts render
**Expected:** Bookmark feature doesn't interfere with data loading

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

#### TS-R3: Navigation Flow
**Precondition:** Multiple bookmarks active
**Steps:**
1. Bookmark all dashboards
2. Navigate between pages using Sidebar
3. Verify navigation works correctly
**Expected:** Bookmark feature doesn't break navigation

**Test Data:** N/A
**Priority:** High
**Automation:** Cypress

---

## 3. SMOKE TEST COVERAGE

### 3.1 Smoke Test Suite for Dashboard Bookmarks (M3)

**File:** `frontend/cypress/e2e/smoke/1-easy.cy.js` (lines 70-95)

**Existing Test Cases:**

```javascript
describe("M3: Dashboard Bookmarks (60 pts)", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  it("bookmark-toggle-dashboard exists on /dashboard", () => {
    cy.visit("/dashboard");
    cy.get('[data-testid="bookmark-toggle-dashboard"]').should("exist");
  });

  it("bookmark-toggle-dashboard1 exists on /dashboard1", () => {
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').should("exist");
  });

  it("bookmark-toggle-dashboard2 exists on /dashboard2", () => {
    cy.visit("/dashboard2");
    cy.get('[data-testid="bookmark-toggle-dashboard2"]').should("exist");
  });

  it("clicking bookmark-toggle-dashboard1 activates bookmark-active-dashboard1", () => {
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').click();
    cy.get('[data-testid="bookmark-active-dashboard1"]').should("be.visible");
  });
});
```

**Total Points for M3:** 60 points

### 3.2 Additional Smoke Tests (Recommended)

```javascript
describe("M3: Dashboard Bookmarks - Extended", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
    // Clear bookmarks before each test
    cy.window().then((win) => {
      const state = JSON.parse(win.localStorage.getItem("sgarden") || "{}");
      if (state.state) {
        state.state.bookmarks = [];
        win.localStorage.setItem("sgarden", JSON.stringify(state));
      }
    });
  });

  it("M3.5: Should persist bookmark after refresh (15 pts)", () => {
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').click();
    cy.reload();
    cy.get('[data-testid="bookmark-active-dashboard1"]').should("be.visible");
  });

  it("M3.6: Should toggle bookmark off (10 pts)", () => {
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').click(); // On
    cy.get('[data-testid="bookmark-active-dashboard1"]').should("be.visible");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').click(); // Off
    cy.get('[data-testid="bookmark-active-dashboard1"]').should("not.be.visible");
  });

  it("M3.7: Should support multiple bookmarks (15 pts)", () => {
    cy.visit("/dashboard");
    cy.get('[data-testid="bookmark-toggle-dashboard"]').click();
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-toggle-dashboard1"]').click();
    cy.visit("/dashboard2");
    cy.get('[data-testid="bookmark-toggle-dashboard2"]').click();
    
    // Verify all are bookmarked
    cy.visit("/dashboard");
    cy.get('[data-testid="bookmark-active-dashboard"]').should("be.visible");
    cy.visit("/dashboard1");
    cy.get('[data-testid="bookmark-active-dashboard1"]').should("be.visible");
    cy.visit("/dashboard2");
    cy.get('[data-testid="bookmark-active-dashboard2"]').should("be.visible");
  });

  afterEach(() => {
    // Clean up bookmarks
    cy.window().then((win) => {
      const state = JSON.parse(win.localStorage.getItem("sgarden") || "{}");
      if (state.state) {
        state.state.bookmarks = [];
        win.localStorage.setItem("sgarden", JSON.stringify(state));
      }
    });
  });
});
```

---

### 3.3 Manual Smoke Test Checklist

- [ ] Bookmark toggle visible on /dashboard
- [ ] Bookmark toggle visible on /dashboard1
- [ ] Bookmark toggle visible on /dashboard2
- [ ] Clicking toggle changes icon from outline to filled star
- [ ] Clicking toggle again changes icon back to outline
- [ ] Active indicator visible when bookmarked
- [ ] Active indicator hidden when not bookmarked
- [ ] Bookmark persists after browser refresh
- [ ] Bookmark persists across page navigation
- [ ] Multiple dashboards can be bookmarked simultaneously
- [ ] localStorage contains bookmarks array
- [ ] No console errors when toggling
- [ ] Toggle works on mobile viewport
- [ ] Toggle accessible via keyboard
- [ ] Tooltip shows on toggle hover
- [ ] Sidebar shows indicator for bookmarked pages (if implemented)

---

## 4. IMPLEMENTATION CHECKLIST

### 4.1 Code Changes Required

- [ ] Update `frontend/src/use-global-state.js`
  - Add bookmarks: []
  - Add toggleBookmark function

- [ ] Update `frontend/src/screens/Dashboard.js`
  - Import bookmark toggle component
  - Add bookmark toggle to page
  - Pass pageId="dashboard"

- [ ] Update `frontend/src/screens/Dashboard1.js`
  - Import bookmark toggle component
  - Add bookmark toggle to page
  - Pass pageId="dashboard1"

- [ ] Update `frontend/src/screens/Dashboard2.js`
  - Import bookmark toggle component
  - Add bookmark toggle to page
  - Pass pageId="dashboard2"

- [ ] Create `frontend/src/components/BookmarkToggle.js` (optional)
  - Create reusable bookmark toggle component
  - Handle icon states (Star vs StarBorder)
  - Add test attributes
  - Add active indicator element

- [ ] Update `frontend/src/components/Sidebar.js` (optional)
  - Add star icons next to bookmarked pages
  - Integrate with bookmarks state

### 4.2 Testing Checklist

- [ ] Run Cypress smoke tests
- [ ] Manual testing on Chrome
- [ ] Manual testing on Firefox
- [ ] Mobile viewport testing
- [ ] Keyboard navigation testing
- [ ] localStorage persistence testing
- [ ] Multiple bookmarks testing
- [ ] Toggle on/off testing

### 4.3 Documentation

- [ ] Update README if needed
- [ ] Add JSDoc comments to new functions
- [ ] Document bookmark state structure
- [ ] Add troubleshooting guide

---

## 5. RISK ASSESSMENT

### 5.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| localStorage not available | Low | Medium | Fallback to in-memory state |
| State sync issues across tabs | Medium | Low | Document as known limitation |
| Performance with many bookmarks | Low | Low | Limit max bookmarks (e.g., 10) |
| Breaking existing dashboard layouts | Medium | High | Careful positioning of toggle button |
| Bookmark data corruption | Low | Medium | Validate and sanitize bookmark data |

### 5.2 UX Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Unclear bookmark purpose | Medium | Medium | Add tooltips and help text |
| Confusing icon states | Low | Medium | Use standard star icons |
| Accidental bookmark toggle | Low | Low | No confirmation needed (easy to undo) |
| Bookmark clutter | Low | Low | Limit max bookmarks |

---

## 6. ROLLBACK PLAN

If critical issues arise:

1. **Immediate:** Hide bookmark toggle buttons (comment out imports)
2. **Short-term:** Disable bookmark state updates (comment out toggleBookmark calls)
3. **Complete rollback:** Revert commits for bookmark implementation

**Rollback triggers:**
- Application crashes when toggling bookmarks
- Data loss or corruption in localStorage
- Critical navigation issues
- More than 3 high-priority bugs

---

## 7. SUCCESS METRICS

### 7.1 Quantitative Metrics

- All 4 smoke tests pass (100%)
- No new console errors
- Toggle response time < 50ms
- Test coverage > 85% for new code
- Zero critical bugs in production

### 7.2 Qualitative Metrics

- User feedback positive
- Intuitive UI/UX
- Code review approval
- Documentation complete

---

## 8. IMPLEMENTATION DETAILS

### 8.1 State Structure

```javascript
// Zustand store state
{
  bookmarks: ["dashboard", "dashboard1"], // Array of bookmarked page IDs
  toggleBookmark: (pageId) => {
    // Add if not present, remove if present
  }
}
```

### 8.2 Component Structure

```javascript
// BookmarkToggle.js
const BookmarkToggle = ({ pageId }) => {
  const bookmarks = useGlobalState((state) => state.bookmarks);
  const toggleBookmark = useGlobalState((state) => state.toggleBookmark);
  const isBookmarked = bookmarks.includes(pageId);

  return (
    <IconButton onClick={() => toggleBookmark(pageId)} data-testid={`bookmark-toggle-${pageId}`}>
      {isBookmarked ? <Star color="secondary" /> : <StarBorder color="action" />}
      {isBookmarked && <span data-testid={`bookmark-active-${pageId}`} style={{ display: "none" }} />}
    </IconButton>
  );
};
```

### 8.3 Integration Points

**Dashboard pages:**
```javascript
import BookmarkToggle from "../components/BookmarkToggle.js";

// Add to page header
<BookmarkToggle pageId="dashboard" />
```

**Sidebar (optional):**
```javascript
const bookmarks = useGlobalState((state) => state.bookmarks);
const isBookmarked = (pageId) => bookmarks.includes(pageId);

// In button mapping
{text: "Overview", isBookmarked: isBookmarked("dashboard")}
```

---

## 9. CONCLUSION

This document provides a comprehensive contract analysis and test coverage plan for Mission M3: Dashboard Bookmarks. The implementation follows React best practices, integrates with existing Zustand state management, and includes extensive testing scenarios to ensure quality and reliability.

**Estimated Effort:** 3-4 hours
**Complexity:** Easy-Medium
**Points Value:** 60 points (Easy tier)

---

**Document Version:** 1.0
**Last Updated:** 2026-04-25
