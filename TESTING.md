# Testing Guide

## Running Tests

### Prerequisites
1. Install Playwright browsers:
```bash
npx playwright install chromium
```

2. Start the development server (in a separate terminal):
```bash
npm run dev
```

### Run All Tests
```bash
npm test
```

### Run Tests with UI
```bash
npm run test:ui
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

## Test Coverage

The test suite in `tests/detail-page.spec.ts` covers:

1. **Navigation from Home to Detail Page**
   - Verifies clicking destination cards navigates to detail page
   - Checks URL changes correctly
   - Confirms detail page elements load

2. **Detail Page Content Display**
   - Destination name and location
   - Rating display
   - Price information
   - Description section
   - Highlights section
   - Cost breakdown (includes/excludes)
   - Booking button

3. **Navigation to Booking Page**
   - Clicking "立即预订" button navigates to booking page
   - Booking page loads correctly

4. **Related Destinations**
   - Related destinations section displays
   - Clicking related destinations navigates correctly

5. **Back Button Navigation**
   - Back button returns to previous page
   - Navigation history works correctly

6. **Responsive Design**
   - Mobile viewport testing
   - Elements display correctly on small screens

7. **UI Elements**
   - Tags display correctly
   - Contact information visible
   - Interactive elements work

## Manual Testing Checklist

- [ ] Home page loads with destination cards
- [ ] Clicking a destination card navigates to detail page
- [ ] Detail page shows all information correctly
- [ ] Images load properly (or placeholders show)
- [ ] "立即预订" button navigates to booking page
- [ ] Related destinations are displayed
- [ ] Clicking related destination navigates to its detail page
- [ ] Back button works on all pages
- [ ] Responsive layout works on mobile (375px width)
- [ ] Responsive layout works on tablet (768px width)
- [ ] Responsive layout works on desktop (1024px+ width)

## Known Issues

- Unsplash images may be blocked by ad blockers (this is expected behavior in the test environment)
- Playwright browser installation may fail in some environments - use system browser or Docker container as fallback

## CI/CD Integration

To run tests in CI/CD pipeline:
```bash
# Install dependencies
npm ci

# Install Playwright with dependencies
npx playwright install --with-deps chromium

# Run tests
npm test
```

For GitHub Actions, use the official Playwright action:
```yaml
- name: Install Playwright
  run: npx playwright install --with-deps chromium
  
- name: Run tests
  run: npm test
```
