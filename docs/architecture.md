# ESSOR Compliance Solutions — Enterprise Architecture Documentation

## 1. System Overview
**ESSOR Compliance Solutions** is an enterprise food-safety consulting, audit-readiness, training, and continuous compliance web platform designed for food manufacturers and exporters.

### Core Objectives
1. **Brochure-Aligned Authority**: Exact representation of company purpose, 6 service lines, 16 training programs, 6-stage client journey, and 4 team capability groups from the 2026 client services profile.
2. **Strict Advisory Boundaries**: Explicitly distinguishes preparatory consulting and mock audits from accredited certification bodies that grant official credentials.
3. **Structured Lead Pipeline**: Captures client requirements, assigns unique sequential tracking references (`ECS-YYYY-XXXX`), records status lifecycle transitions with reasons, and preserves internal consultant notes.
4. **Administrative Console**: Role-Based Access Control (`SUPER_ADMIN`, `ADMIN`, `SALES`, `CONTENT_MANAGER`) with immutable audit logging and configurable company metadata so unknown business details are never fabricated.

---

## 2. Monolith & Route Map

### Public Surface
- `/` — Homepage: Hero value proposition, 3 pillars (Consult, Managed, AI Platform), standards supported, service previews, 6-stage process, training catalogue teaser, digital tools preview, team expertise, and consultation CTA.
- `/about` — About ESSOR: Purpose, Vision, Mission, and continuous compliance philosophy.
- `/services` — Services Portfolio: All 6 service categories, deliverables, and adaptive scoping.
- `/services/audit-readiness` — Deep-dive audit preparation, gap assessments, mock audits, NC/CAPA closure.
- `/services/managed-support` — Monthly hygiene checks, supplier assurance, complaint management, food-safety team coaching.
- `/services/quality-management` — Integrated ISO 9001, 14001, 45001, and GMO/Non-GMO frameworks.
- `/services/specialized-requirements` — GFCO, Halal, Kosher, and Export Inspection Agency (EIA) mandates.
- `/training` — 16-course training catalogue with search, category filtering, syllabus breakdown, and quotation requests.
- `/digital-compliance` — 6 digital compliance modules, interactive daily GMP inspection simulator, and tenant isolation architecture.
- `/our-process` — 6-stage engagement lifecycle: Gap Assessment, Documentation, Implementation, Mock Audit, Official Audit, NC / CAPA.
- `/team` — Team capability groups (Experienced Lead Auditors, Food Safety Audit Experts, Food Technologists, IIM & IIT alumni).
- `/contact` — Structured enterprise enquiry form, direct office directory, and working hours.
- `/privacy-policy`, `/terms`, `/cookies` — CMS-editable legal notices.

### Administration Console (`/admin`)
- **Dashboard**: Real-time calculation of pipeline counts, conversion ratios, and service demand distribution.
- **Enquiries**: Filterable lead management, controlled status transitions, staff assignment, internal notes, and CSV export.
- **Services**: Service catalogue and deliverable maintenance.
- **Training**: 16-course syllabus and delivery mode manager.
- **Content**: Live CMS copy and contact coordinates editor.
- **Audit Logs**: Immutable log of administrative actions with timestamps and actors.

---

## 3. Database Schema (PostgreSQL / Relational Data Model)

```sql
-- Users and Roles
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'SALES', 'CONTENT_MANAGER')),
  is_active BOOLEAN DEFAULT TRUE,
  last_login_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(120) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(80) NOT NULL,
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  deliverables JSONB NOT NULL DEFAULT '[]',
  applicable_standards JSONB DEFAULT '[]',
  display_order INT NOT NULL DEFAULT 1,
  status VARCHAR(30) DEFAULT 'PUBLISHED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Training Courses
CREATE TABLE training_courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(150) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  summary TEXT NOT NULL,
  target_audience TEXT,
  key_topics JSONB NOT NULL DEFAULT '[]',
  delivery_modes JSONB NOT NULL DEFAULT '[]',
  duration VARCHAR(100),
  status VARCHAR(30) DEFAULT 'PUBLISHED',
  display_order INT NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiries
CREATE TABLE enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company_name VARCHAR(255) NOT NULL,
  industry VARCHAR(100),
  service_id UUID REFERENCES services(id) ON DELETE SET NULL,
  service_title VARCHAR(255),
  audit_standard VARCHAR(150),
  preferred_contact_method VARCHAR(20) DEFAULT 'EMAIL',
  message TEXT NOT NULL,
  status VARCHAR(30) DEFAULT 'NEW',
  assigned_to VARCHAR(255),
  source_page VARCHAR(255),
  privacy_acknowledged BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiry Notes
CREATE TABLE enquiry_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  author_name VARCHAR(255) NOT NULL,
  author_email VARCHAR(255) NOT NULL,
  note TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enquiry Status History
CREATE TABLE enquiry_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
  previous_status VARCHAR(30) NOT NULL,
  new_status VARCHAR(30) NOT NULL,
  changed_by_name VARCHAR(255) NOT NULL,
  changed_by_email VARCHAR(255) NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit Logs
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_name VARCHAR(255) NOT NULL,
  actor_email VARCHAR(255) NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  summary TEXT NOT NULL,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 4. REST API Specification (`/api/v1`)

### Public Endpoints
- `GET /api/v1/health` — Health check & system uptime.
- `GET /api/v1/services` — List published services.
- `GET /api/v1/services/:slug` — Single service details.
- `GET /api/v1/training` — List published training courses with category filtering.
- `GET /api/v1/training/:slug` — Course syllabus and delivery modes.
- `GET /api/v1/content` — Public CMS content and verified contact details.
- `POST /api/v1/enquiries` — Submit structured lead enquiry; returns reference number.

### Administrative Endpoints (RBAC Enforced)
- `GET /api/v1/admin/dashboard` — Live metric aggregations.
- `GET /api/v1/admin/enquiries` — Paginated and filtered enquiries.
- `PATCH /api/v1/admin/enquiries/:id` — Update status with reason.
- `POST /api/v1/admin/enquiries/:id/notes` — Append internal staff note.
- `POST /api/v1/admin/enquiries/:id/assign` — Assign lead to team member.
- `GET /api/v1/admin/enquiries/export` — Stream CSV export of authorized records.
- `POST /api/v1/admin/services` — Create or update service definition.
- `POST /api/v1/admin/training` — Create or update training course.
- `PUT /api/v1/admin/content` — Update global CMS copy.
- `GET /api/v1/admin/audit-logs` — Retrieve immutable audit trail.
