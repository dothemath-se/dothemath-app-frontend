import { Button } from '../Button';
import { LoadingIndicator } from '../LoadingIndicator';
import styles from './SubjectList.module.sass';
import { useSubjectListService } from './useSubjectListService';

interface SubjectListProps {
  onComplete: (arg0: { name: string; id: string }) => void;
}

export const SubjectList = (props: SubjectListProps) => {
  const [subjects, loading] = useSubjectListService();

  return (
    <>
      {!loading && (
        <div id="popup">
          <div
            className={`${styles['subjects-container']} registration-and-subjects-container`}
          >
            <h2>Välj ämne</h2>
            {subjects.map((item) => (
              <>
                <Button
                  primary
                  key={item.id}
                  onClick={() => props.onComplete(item)}
                >
                  {item.name}
                </Button>
              </>
            ))}
          </div>
        </div>
      )}
      <LoadingIndicator loading={loading} />
    </>
  );
};
