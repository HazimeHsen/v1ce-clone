"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";
import { PageLoader } from "@/components/ui/loader";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OrderFailedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { t, locale } = useTranslations();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    
    if (errorParam === 'order_already_completed') {
      setError('order_already_completed');
    } else {
      setError('unknown_error');
    }
    
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return <PageLoader />;
  }

  const getErrorMessage = () => {
    switch (error) {
      case 'order_already_completed':
        return {
          title: t("orderFailed.alreadyCompleted.title"),
          description: t("orderFailed.alreadyCompleted.description"),
          icon: "⚠️"
        };
      default:
        return {
          title: t("orderFailed.generic.title"),
          description: t("orderFailed.generic.description"),
          icon: "❌"
        };
    }
  };

  const errorInfo = getErrorMessage();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>

      <div className="max-w-2xl mx-auto px-4 py-8 relative z-10">
        {/* Error Header */}
        <div className="text-center mb-8">
          <div className="p-6 rounded-full bg-orange-100 w-fit mx-auto mb-6 relative">
            <AlertCircle className="h-16 w-16 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {errorInfo.title}
          </h1>
          <p className="text-muted-foreground mb-4 max-w-md mx-auto">
            {errorInfo.description}
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              {t("orderFailed.whatHappened")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error === 'order_already_completed' ? (
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {t("orderFailed.alreadyCompleted.explanation")}
                </p>
                <div className="bg-secondary p-4 rounded-lg border border-primary/50">
                  <h4 className="font-semibold text-primary mb-2">
                    {t("orderFailed.alreadyCompleted.solution.title")}
                  </h4>
                  <p className="text-primary text-sm">
                    {t("orderFailed.alreadyCompleted.solution.description")}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                {t("orderFailed.generic.explanation")}
              </p>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground mb-2">
            {t("orderFailed.needHelp")}
          </p>
          <Button asChild variant="link" className="text-primary">
            <Link href="/contact">
              {t("orderFailed.contactSupport")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
