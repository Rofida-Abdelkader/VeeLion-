
# Frontend Code Review

**File:** `frontend/app/activity/page.tsx`

## 1. Maintainability

### Issue 1: Duplicate Date Formatting Functions

**What is wrong:**

`formatTimeA` and `formatTimeB` perform the same operation. Both convert a date string into a localized date and time string.

**Why it matters:**

Having two functions that do the same job makes the code longer and harder to maintain.

**Suggested improvement:**

Keep one reusable function for formatting dates and use it wherever needed.

### Issue 2: Duplicate Filtering Functions

**What is wrong:**

`applyFilterA` uses `includes()`, while `applyFilterB` uses `indexOf() !== -1`. Both methods check whether the search text exists in a string. Calling both functions one after another repeats the filtering process.

**Why it matters:**

The code contains unnecessary duplication and is harder to understand.

**Suggested improvement:**

Replace both functions with one function named `applyFilterActivity` that handles the filtering logic.

---

## 2. Performance

### Issue 3: Unnecessary Repeated Filtering

**What is wrong:**

The `tick` state and `setInterval` cause the activity list to be filtered every 1400 milliseconds, even when the activity data and search query have not changed.

**Why it matters:**

This causes unnecessary filtering operations and state updates.

**Suggested improvement:**

Remove `tick` and `setInterval` if periodic updates are not required. Filter the activity list only when the data or search query changes.

---

## 3. React Best Practices

### Issue 4: Repeated Filtering Inside `useEffect`

**What is wrong:**

The current `useEffect` calls two filtering functions and uses unclear variable names such as `a` and `b`.

**Why it matters:**

The effect performs unnecessary work and makes the component harder to read.

**Suggested improvement:**

Use one filtering function and a descriptive variable name.

```tsx
useEffect(() => {
  const filteredActivity = applyFilterActivity(allActivity, query);
  setShownActivity(filteredActivity);
}, [query, allActivity]);
```

---

## 4. Code Quality

### Issue 5: Unclear Variable and Function Names

**What is wrong:**

Names such as `a`, `b`, `applyFilterA`, and `formatTimeA` do not clearly describe their purpose.

**Why it matters:**

Unclear names make the code harder to read and maintain.

**Suggested improvement:**

Use descriptive names, such as:
- `applyFilterA` → `applyFilterActivity`
- `a` → `filteredActivity`
- `formatTimeA` and `formatTimeB` → one reusable date-formatting function

