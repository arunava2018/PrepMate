import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { getSubjects } from "@/db/apiSubjects";
import Loader from "@/components/Loader";


function Subject() {
  const { id } = useParams();
  const [subject, setSubject] = useState(null);
  const { data, loading, error, fn: fnSubjects } = useFetch(getSubjects);

  useEffect(() => {
    fnSubjects().then((res) => {
      const matched = res.find((subj) => subj.id === id);
      setSubject(matched || null);
    });
  }, []);

  if (loading) return <Loader />;
  if (!subject) return <p>Loading or subject not found</p>;

  return (
    <div>
      <h1>{subject.name}</h1>
      <p>Questions: {subject.question_count}</p>
    </div>
  );
}

export default Subject;
