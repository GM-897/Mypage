import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { apiPost, apiPut, apiDelete } from '../../hooks/useApi';
import ImageUpload from './ImageUpload';

const API_URL = process.env.REACT_APP_API_URL || (process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:5001/api');

// ── Layout ────────────────────────────────────────────────────────────────────

const Page = styled.div`
  min-height: 100vh;
  background: #1C1C27;
  color: #F2F3F4;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  background: #171721;
  border-bottom: 1px solid #333;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 22px;
  font-weight: 700;
  color: #854CE6;
  margin: 0;
`;

const LogoutBtn = styled.button`
  padding: 8px 18px;
  background: transparent;
  border: 1px solid #854CE6;
  color: #854CE6;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  &:hover { background: #854CE6; color: #fff; }
`;

const Body = styled.div`
  display: flex;
  flex: 1;
`;

const Sidebar = styled.nav`
  width: 200px;
  background: #171721;
  border-right: 1px solid #333;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NavItem = styled.button`
  text-align: left;
  padding: 12px 24px;
  background: ${({ active }) => (active ? '#854CE6' : 'transparent')};
  color: ${({ active }) => (active ? '#fff' : '#b1b2b3')};
  border: none;
  cursor: pointer;
  font-size: 15px;
  font-weight: ${({ active }) => (active ? '600' : '400')};
  transition: all 0.15s;
  &:hover { background: ${({ active }) => (active ? '#854CE6' : '#2a2a3a')}; color: #fff; }
`;

const Main = styled.div`
  flex: 1;
  padding: 32px;
  overflow-y: auto;
`;

// ── Shared UI ─────────────────────────────────────────────────────────────────

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  margin: 0 0 24px;
  color: #F2F3F4;
`;

const Card = styled.div`
  background: #171721;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 20px 24px;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
`;

const CardInfo = styled.div`
  flex: 1;
`;

const CardTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #F2F3F4;
`;

const CardSub = styled.div`
  font-size: 13px;
  color: #b1b2b3;
  margin-top: 4px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
`;

const EditBtn = styled.button`
  padding: 6px 14px;
  background: #854CE6;
  color: #fff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  &:hover { background: #6b3bbf; }
`;

const DeleteBtn = styled.button`
  padding: 6px 14px;
  background: transparent;
  color: #ff6b6b;
  border: 1px solid #ff6b6b;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
  &:hover { background: #ff6b6b; color: #fff; }
`;

const AddBtn = styled.button`
  padding: 10px 20px;
  background: #854CE6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  &:hover { background: #6b3bbf; }
`;

const SaveBtn = styled.button`
  padding: 10px 24px;
  background: #854CE6;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  &:hover { background: #6b3bbf; }
  &:disabled { opacity: 0.6; cursor: not-allowed; }
`;

const CancelBtn = styled.button`
  padding: 10px 24px;
  background: transparent;
  color: #b1b2b3;
  border: 1px solid #444;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  &:hover { border-color: #854CE6; color: #854CE6; }
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: ${({ full }) => (full ? '1 1 100%' : '1 1 200px')};
`;

const FieldLabel = styled.label`
  font-size: 13px;
  color: #b1b2b3;
`;

const Input = styled.input`
  padding: 10px 12px;
  background: #1C1C27;
  border: 1px solid #444;
  border-radius: 8px;
  color: #F2F3F4;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #854CE6; }
`;

const Select = styled.select`
  padding: 10px 12px;
  background: #1C1C27;
  border: 1px solid #444;
  border-radius: 8px;
  color: #F2F3F4;
  font-size: 14px;
  outline: none;
  &:focus { border-color: #854CE6; }
`;

const Textarea = styled.textarea`
  padding: 10px 12px;
  background: #1C1C27;
  border: 1px solid #444;
  border-radius: 8px;
  color: #F2F3F4;
  font-size: 14px;
  outline: none;
  resize: vertical;
  min-height: 80px;
  &:focus { border-color: #854CE6; }
`;

const FormBox = styled.div`
  background: #171721;
  border: 1px solid #854CE6;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
`;

const FormTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px;
  color: #854CE6;
`;

const FormBtns = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 8px;
`;

const StatusMsg = styled.p`
  font-size: 13px;
  color: ${({ error }) => (error ? '#ff6b6b' : '#4caf50')};
  margin: 8px 0 0;
`;

// ── Helpers ───────────────────────────────────────────────────────────────────

const tagsToArray = (str) => str.split(',').map((s) => s.trim()).filter(Boolean);
const arrayToTags = (arr) => (arr || []).join(', ');

// ── Experience Tab ────────────────────────────────────────────────────────────

const EMPTY_EXP = { img: '', role: '', company: '', date: '', desc: '', skills: '', type: 'internship', doc: '', order: 0 };

const ExperienceTab = ({ token }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`${API_URL}/experiences`);
    setItems(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    try {
      const payload = { ...form, skills: tagsToArray(form.skills) };
      if (editId) {
        await apiPut(`/admin/experiences/${editId}`, payload, token);
        setStatus('Updated!');
      } else {
        await apiPost('/admin/experiences', payload, token);
        setStatus('Added!');
      }
      setStatusError(false);
      setForm(null);
      setEditId(null);
      load();
    } catch (err) {
      setStatus(err.message);
      setStatusError(true);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this experience?')) return;
    await apiDelete(`/admin/experiences/${id}`, token);
    load();
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({ ...item, skills: arrayToTags(item.skills) });
  };

  return (
    <div>
      <SectionTitle>Experience</SectionTitle>
      <AddBtn onClick={() => { setForm({ ...EMPTY_EXP }); setEditId(null); }}>+ Add Experience</AddBtn>

      {form && (
        <FormBox>
          <FormTitle>{editId ? 'Edit Experience' : 'New Experience'}</FormTitle>
          <FormRow>
            <Field><FieldLabel>Role *</FieldLabel><Input value={form.role} onChange={(e) => setF('role', e.target.value)} /></Field>
            <Field><FieldLabel>Company *</FieldLabel><Input value={form.company} onChange={(e) => setF('company', e.target.value)} /></Field>
          </FormRow>
          <FormRow>
            <Field><FieldLabel>Date (e.g. Jan 2023 - Mar 2024)</FieldLabel><Input value={form.date} onChange={(e) => setF('date', e.target.value)} /></Field>
            <Field>
              <FieldLabel>Type</FieldLabel>
              <Select value={form.type} onChange={(e) => setF('type', e.target.value)}>
                <option value="internship">Internship</option>
                <option value="job">Full-time Job</option>
                <option value="freelance">Freelance</option>
                <option value="other">Other</option>
              </Select>
            </Field>
            <Field><FieldLabel>Order (for sorting)</FieldLabel><Input type="number" value={form.order} onChange={(e) => setF('order', Number(e.target.value))} /></Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Description</FieldLabel>
              <Textarea value={form.desc} onChange={(e) => setF('desc', e.target.value)} />
            </Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Skills (comma-separated, e.g. React, Node.js, AWS)</FieldLabel>
              <Input value={form.skills} onChange={(e) => setF('skills', e.target.value)} placeholder="React, Node.js, MongoDB" />
            </Field>
          </FormRow>
          <FormRow>
            <Field full>
              <ImageUpload label="Company Logo" value={form.img} onChange={(url) => setF('img', url)} />
            </Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Certificate / Doc URL (optional)</FieldLabel>
              <Input value={form.doc} onChange={(e) => setF('doc', e.target.value)} placeholder="https://..." />
            </Field>
          </FormRow>
          <FormBtns>
            <SaveBtn onClick={save}>Save</SaveBtn>
            <CancelBtn onClick={() => { setForm(null); setEditId(null); setStatus(''); }}>Cancel</CancelBtn>
          </FormBtns>
          {status && <StatusMsg error={statusError}>{status}</StatusMsg>}
        </FormBox>
      )}

      {items.map((item) => (
        <Card key={item._id}>
          {item.img && <img src={item.img} alt={item.company} style={{ height: 48, width: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
          <CardInfo>
            <CardTitle>{item.role}</CardTitle>
            <CardSub>{item.company} · {item.date} · {item.type}</CardSub>
          </CardInfo>
          <CardActions>
            <EditBtn onClick={() => startEdit(item)}>Edit</EditBtn>
            <DeleteBtn onClick={() => del(item._id)}>Delete</DeleteBtn>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// ── Projects Tab ──────────────────────────────────────────────────────────────

const EMPTY_PROJ = { image: '', title: '', description: '', date: '', tags: '', category: 'web app', github: '', webapp: '', order: 0 };

const ProjectsTab = ({ token }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`${API_URL}/projects`);
    setItems(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    try {
      const payload = { ...form, tags: tagsToArray(form.tags) };
      if (editId) {
        await apiPut(`/admin/projects/${editId}`, payload, token);
        setStatus('Updated!');
      } else {
        await apiPost('/admin/projects', payload, token);
        setStatus('Added!');
      }
      setStatusError(false);
      setForm(null);
      setEditId(null);
      load();
    } catch (err) {
      setStatus(err.message);
      setStatusError(true);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    await apiDelete(`/admin/projects/${id}`, token);
    load();
  };

  const startEdit = (item) => {
    setEditId(item._id);
    setForm({ ...item, tags: arrayToTags(item.tags) });
  };

  return (
    <div>
      <SectionTitle>Projects</SectionTitle>
      <AddBtn onClick={() => { setForm({ ...EMPTY_PROJ }); setEditId(null); }}>+ Add Project</AddBtn>

      {form && (
        <FormBox>
          <FormTitle>{editId ? 'Edit Project' : 'New Project'}</FormTitle>
          <FormRow>
            <Field full><FieldLabel>Title *</FieldLabel><Input value={form.title} onChange={(e) => setF('title', e.target.value)} /></Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Description</FieldLabel>
              <Textarea value={form.description} onChange={(e) => setF('description', e.target.value)} />
            </Field>
          </FormRow>
          <FormRow>
            <Field><FieldLabel>Date</FieldLabel><Input value={form.date} onChange={(e) => setF('date', e.target.value)} placeholder="Jun 2023" /></Field>
            <Field>
              <FieldLabel>Category</FieldLabel>
              <Select value={form.category} onChange={(e) => setF('category', e.target.value)}>
                <option value="web app">Web App</option>
                <option value="android app">Android App</option>
                <option value="machine learning">Machine Learning</option>
                <option value="other">Other</option>
              </Select>
            </Field>
            <Field><FieldLabel>Order</FieldLabel><Input type="number" value={form.order} onChange={(e) => setF('order', Number(e.target.value))} /></Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Tags (comma-separated)</FieldLabel>
              <Input value={form.tags} onChange={(e) => setF('tags', e.target.value)} placeholder="React, Node.js, MongoDB" />
            </Field>
          </FormRow>
          <FormRow>
            <Field><FieldLabel>GitHub URL</FieldLabel><Input value={form.github} onChange={(e) => setF('github', e.target.value)} placeholder="https://github.com/..." /></Field>
            <Field><FieldLabel>Live Demo URL</FieldLabel><Input value={form.webapp} onChange={(e) => setF('webapp', e.target.value)} placeholder="https://..." /></Field>
          </FormRow>
          <FormRow>
            <Field full>
              <ImageUpload label="Project Image" value={form.image} onChange={(url) => setF('image', url)} />
            </Field>
          </FormRow>
          <FormBtns>
            <SaveBtn onClick={save}>Save</SaveBtn>
            <CancelBtn onClick={() => { setForm(null); setEditId(null); setStatus(''); }}>Cancel</CancelBtn>
          </FormBtns>
          {status && <StatusMsg error={statusError}>{status}</StatusMsg>}
        </FormBox>
      )}

      {items.map((item) => (
        <Card key={item._id}>
          {item.image && <img src={item.image} alt={item.title} style={{ height: 48, width: 64, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
          <CardInfo>
            <CardTitle>{item.title}</CardTitle>
            <CardSub>{item.category} · {item.date} · {(item.tags || []).join(', ')}</CardSub>
          </CardInfo>
          <CardActions>
            <EditBtn onClick={() => startEdit(item)}>Edit</EditBtn>
            <DeleteBtn onClick={() => del(item._id)}>Delete</DeleteBtn>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// ── Education Tab ─────────────────────────────────────────────────────────────

const EMPTY_EDU = { img: '', school: '', date: '', degree: '', desc: '', grade: '', order: 0 };

const EducationTab = ({ token }) => {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(null);
  const [editId, setEditId] = useState(null);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`${API_URL}/education`);
    setItems(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    try {
      if (editId) {
        await apiPut(`/admin/education/${editId}`, form, token);
        setStatus('Updated!');
      } else {
        await apiPost('/admin/education', form, token);
        setStatus('Added!');
      }
      setStatusError(false);
      setForm(null);
      setEditId(null);
      load();
    } catch (err) {
      setStatus(err.message);
      setStatusError(true);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this education entry?')) return;
    await apiDelete(`/admin/education/${id}`, token);
    load();
  };

  return (
    <div>
      <SectionTitle>Education</SectionTitle>
      <AddBtn onClick={() => { setForm({ ...EMPTY_EDU }); setEditId(null); }}>+ Add Education</AddBtn>

      {form && (
        <FormBox>
          <FormTitle>{editId ? 'Edit Education' : 'New Education'}</FormTitle>
          <FormRow>
            <Field full><FieldLabel>School / University *</FieldLabel><Input value={form.school} onChange={(e) => setF('school', e.target.value)} /></Field>
          </FormRow>
          <FormRow>
            <Field><FieldLabel>Degree</FieldLabel><Input value={form.degree} onChange={(e) => setF('degree', e.target.value)} /></Field>
            <Field><FieldLabel>Date (e.g. 2020 - 2024)</FieldLabel><Input value={form.date} onChange={(e) => setF('date', e.target.value)} /></Field>
            <Field><FieldLabel>Grade / GPA</FieldLabel><Input value={form.grade} onChange={(e) => setF('grade', e.target.value)} /></Field>
            <Field><FieldLabel>Order</FieldLabel><Input type="number" value={form.order} onChange={(e) => setF('order', Number(e.target.value))} /></Field>
          </FormRow>
          <FormRow>
            <Field full>
              <FieldLabel>Description</FieldLabel>
              <Textarea value={form.desc} onChange={(e) => setF('desc', e.target.value)} />
            </Field>
          </FormRow>
          <FormRow>
            <Field full>
              <ImageUpload label="School Logo" value={form.img} onChange={(url) => setF('img', url)} />
            </Field>
          </FormRow>
          <FormBtns>
            <SaveBtn onClick={save}>Save</SaveBtn>
            <CancelBtn onClick={() => { setForm(null); setEditId(null); setStatus(''); }}>Cancel</CancelBtn>
          </FormBtns>
          {status && <StatusMsg error={statusError}>{status}</StatusMsg>}
        </FormBox>
      )}

      {items.map((item) => (
        <Card key={item._id}>
          {item.img && <img src={item.img} alt={item.school} style={{ height: 48, width: 48, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />}
          <CardInfo>
            <CardTitle>{item.school}</CardTitle>
            <CardSub>{item.degree} · {item.date} · {item.grade}</CardSub>
          </CardInfo>
          <CardActions>
            <EditBtn onClick={() => { setEditId(item._id); setForm({ ...item }); }}>Edit</EditBtn>
            <DeleteBtn onClick={() => del(item._id)}>Delete</DeleteBtn>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// ── Bio Tab ───────────────────────────────────────────────────────────────────

const BioTab = ({ token }) => {
  const [form, setForm] = useState(null);
  const [roles, setRoles] = useState('');
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/bio`)
      .then((r) => r.json())
      .then((bio) => {
        setForm(bio || {});
        setRoles(arrayToTags(bio?.roles));
      });
  }, []);

  const setF = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const save = async () => {
    try {
      await apiPut('/admin/bio', { ...form, roles: tagsToArray(roles) }, token);
      setStatus('Bio saved!');
      setStatusError(false);
    } catch (err) {
      setStatus(err.message);
      setStatusError(true);
    }
  };

  if (!form) return <p style={{ color: '#b1b2b3' }}>Loading...</p>;

  return (
    <div>
      <SectionTitle>Bio</SectionTitle>
      <FormBox>
        <FormRow>
          <Field full><FieldLabel>Name</FieldLabel><Input value={form.name || ''} onChange={(e) => setF('name', e.target.value)} /></Field>
        </FormRow>
        <FormRow>
          <Field full>
            <FieldLabel>Roles / Titles (comma-separated, used for typewriter effect)</FieldLabel>
            <Input value={roles} onChange={(e) => setRoles(e.target.value)} placeholder="Fullstack Developer, ML Engineer" />
          </Field>
        </FormRow>
        <FormRow>
          <Field full>
            <FieldLabel>Description</FieldLabel>
            <Textarea value={form.description || ''} onChange={(e) => setF('description', e.target.value)} rows={4} />
          </Field>
        </FormRow>
        <FormRow>
          <Field><FieldLabel>GitHub URL</FieldLabel><Input value={form.github || ''} onChange={(e) => setF('github', e.target.value)} /></Field>
          <Field><FieldLabel>LinkedIn URL</FieldLabel><Input value={form.linkedin || ''} onChange={(e) => setF('linkedin', e.target.value)} /></Field>
        </FormRow>
        <FormRow>
          <Field><FieldLabel>Resume URL</FieldLabel><Input value={form.resume || ''} onChange={(e) => setF('resume', e.target.value)} /></Field>
          <Field><FieldLabel>Twitter URL</FieldLabel><Input value={form.twitter || ''} onChange={(e) => setF('twitter', e.target.value)} /></Field>
        </FormRow>
        <FormRow>
          <Field><FieldLabel>Instagram URL</FieldLabel><Input value={form.insta || ''} onChange={(e) => setF('insta', e.target.value)} /></Field>
          <Field><FieldLabel>Facebook URL</FieldLabel><Input value={form.facebook || ''} onChange={(e) => setF('facebook', e.target.value)} /></Field>
        </FormRow>
        <FormRow>
          <Field full>
            <ImageUpload label="Profile / Hero Image" value={form.profileImage || ''} onChange={(url) => setF('profileImage', url)} />
          </Field>
        </FormRow>
        <FormBtns>
          <SaveBtn onClick={save}>Save Bio</SaveBtn>
        </FormBtns>
        {status && <StatusMsg error={statusError}>{status}</StatusMsg>}
      </FormBox>
    </div>
  );
};

// ── Skills Tab ────────────────────────────────────────────────────────────────

const SkillsTab = ({ token }) => {
  const [categories, setCategories] = useState([]);
  const [editCatId, setEditCatId] = useState(null);
  const [catForm, setCatForm] = useState(null);
  const [status, setStatus] = useState('');
  const [statusError, setStatusError] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`${API_URL}/skills`);
    setCategories(await res.json());
  }, []);

  useEffect(() => { load(); }, [load]);

  const EMPTY_CAT = { title: '', order: 0, skills: [] };

  const addSkillRow = () => setCatForm((f) => ({ ...f, skills: [...f.skills, { name: '', image: '' }] }));
  const removeSkillRow = (i) => setCatForm((f) => ({ ...f, skills: f.skills.filter((_, idx) => idx !== i) }));
  const updateSkillRow = (i, key, val) => setCatForm((f) => ({
    ...f,
    skills: f.skills.map((s, idx) => idx === i ? { ...s, [key]: val } : s),
  }));

  const save = async () => {
    try {
      if (editCatId) {
        await apiPut(`/admin/skills/${editCatId}`, catForm, token);
        setStatus('Updated!');
      } else {
        await apiPost('/admin/skills', catForm, token);
        setStatus('Added!');
      }
      setStatusError(false);
      setCatForm(null);
      setEditCatId(null);
      load();
    } catch (err) {
      setStatus(err.message);
      setStatusError(true);
    }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this skill category?')) return;
    await apiDelete(`/admin/skills/${id}`, token);
    load();
  };

  return (
    <div>
      <SectionTitle>Skills</SectionTitle>
      <AddBtn onClick={() => { setCatForm({ ...EMPTY_CAT, skills: [] }); setEditCatId(null); }}>+ Add Skill Category</AddBtn>

      {catForm && (
        <FormBox>
          <FormTitle>{editCatId ? 'Edit Category' : 'New Category'}</FormTitle>
          <FormRow>
            <Field><FieldLabel>Category Title (e.g. Frontend)</FieldLabel><Input value={catForm.title} onChange={(e) => setCatForm((f) => ({ ...f, title: e.target.value }))} /></Field>
            <Field><FieldLabel>Order</FieldLabel><Input type="number" value={catForm.order} onChange={(e) => setCatForm((f) => ({ ...f, order: Number(e.target.value) }))} /></Field>
          </FormRow>

          <FieldLabel style={{ display: 'block', marginBottom: 8 }}>Skills in this category</FieldLabel>
          {catForm.skills.map((s, i) => (
            <FormRow key={i} style={{ alignItems: 'center' }}>
              <Field><Input placeholder="Skill name" value={s.name} onChange={(e) => updateSkillRow(i, 'name', e.target.value)} /></Field>
              <Field full>
                <ImageUpload label="" value={s.image} onChange={(url) => updateSkillRow(i, 'image', url)} />
              </Field>
              <DeleteBtn style={{ alignSelf: 'center', marginTop: 4 }} onClick={() => removeSkillRow(i)}>×</DeleteBtn>
            </FormRow>
          ))}
          <CancelBtn style={{ marginBottom: 16 }} onClick={addSkillRow}>+ Add Skill Row</CancelBtn>

          <FormBtns>
            <SaveBtn onClick={save}>Save</SaveBtn>
            <CancelBtn onClick={() => { setCatForm(null); setEditCatId(null); setStatus(''); }}>Cancel</CancelBtn>
          </FormBtns>
          {status && <StatusMsg error={statusError}>{status}</StatusMsg>}
        </FormBox>
      )}

      {categories.map((cat) => (
        <Card key={cat._id}>
          <CardInfo>
            <CardTitle>{cat.title}</CardTitle>
            <CardSub>{(cat.skills || []).map((s) => s.name).join(', ')}</CardSub>
          </CardInfo>
          <CardActions>
            <EditBtn onClick={() => { setEditCatId(cat._id); setCatForm({ ...cat }); }}>Edit</EditBtn>
            <DeleteBtn onClick={() => del(cat._id)}>Delete</DeleteBtn>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

// ── Dashboard Root ────────────────────────────────────────────────────────────

const TABS = ['Experience', 'Projects', 'Education', 'Skills', 'Bio'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('Experience');
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  const logout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin/login');
  };

  return (
    <Page>
      <Header>
        <HeaderTitle>Portfolio Admin</HeaderTitle>
        <LogoutBtn onClick={logout}>Logout</LogoutBtn>
      </Header>
      <Body>
        <Sidebar>
          {TABS.map((tab) => (
            <NavItem key={tab} active={activeTab === tab} onClick={() => setActiveTab(tab)}>
              {tab}
            </NavItem>
          ))}
        </Sidebar>
        <Main>
          {activeTab === 'Experience' && <ExperienceTab token={token} />}
          {activeTab === 'Projects' && <ProjectsTab token={token} />}
          {activeTab === 'Education' && <EducationTab token={token} />}
          {activeTab === 'Skills' && <SkillsTab token={token} />}
          {activeTab === 'Bio' && <BioTab token={token} />}
        </Main>
      </Body>
    </Page>
  );
};

export default AdminDashboard;
